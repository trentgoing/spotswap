import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addSpotMutation } from '../../../queries/queriesSpot';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidHJlbnRnb2luZyIsImEiOiJjam11bDQwdGwyeWZ5M3FqcGFuaHRxd3Q2In0.UyaQAvC0nx08Ih7-vq3wag';

// THIS IS THE FORM TO ADD A SPOT
class AddSpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservedToggle: false,
      start_time: moment().format(),
      end_time:  moment().add(10, 'minute').format(),
      modalShow: true,
      homeRedirect: false,
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
    };
    
    this.handleClose = this.handleClose.bind(this);
    this.changeView = this.changeView.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.displayTimeForReservedSpots = this.displayTimeForReservedSpots.bind(this);
    this.handleInputTimeChange = this.handleInputTimeChange.bind(this);
  };

  changeView(arg) {
    this.setState({
      reservedToggle: arg
    })
  };

  handleClose() {
    console.log('GO HOME')
    this.setState({ homeRedirect: true });
  };

  handleInputTimeChange(event) { 
    let extraMin = event.target.value;
    let end_time = moment(this.state.start_time).add(extraMin, 'minute').format();
    this.setState({
      end_time: end_time
    })
  };

  componentDidMount() {
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.location.state.lng.toString()},${this.props.location.state.lat.toString()}.json?access_token=${mapboxgl.accessToken}`)
      .then(({data}) => {
        let addressHolder = {};
        data.features.forEach((feature) => {
          let type = feature['place_type'][0];
          if (type === 'address') {
            if (feature.address !== undefined) {
              addressHolder.street1 = feature.address + ' ' + feature.text;
            } else {
              addressHolder.street1 = feature.text;
            }
          } else if (type === 'neighborhood') {
            addressHolder.street2 = feature.text
          } else if (type === 'postcode') {
            addressHolder.zip = feature.text
          } else if (type === 'place') {
            addressHolder.city = feature.text
          } else if (type === 'region') {
            addressHolder.state = feature.text
          }
        })
        this.setState({
          street1: addressHolder.street1,
          street2: addressHolder.street2,
          zip: addressHolder.zip,
          city: addressHolder.city,
          state: addressHolder.state
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  submitForm(event) {
    event.preventDefault();

    this.props.addSpotMutation({
      variables: {
        lng: (this.props.location.state.lng).toString(),
        lat: (this.props.location.state.lat).toString(),
        type: this.state.reservedToggle ? 1 : 2,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        status: 1,
        street1: this.state.street1,
        street2: this.state.street2,
        zip: parseInt(this.state.zip, 10),
        city: this.state.city,
        state: this.state.state
      },
      // refetchQueries: [{query: getSpotsQuery, variables: {}}]
    });
    this.setState({ homeRedirect: true });
  };

  displayTimeForReservedSpots() {
    if (this.state.reservedToggle) {
      return (
        <div>
          <p> I will hold this spot </p>
          <div className="field">
              <label>For the next: </label>
              <input type="text" name="time" onChange={this.handleInputTimeChange}/><span> minutes</span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <p> I saw an open spot at </p>
        </div>
      );
    }
  };

  render() {
    if (this.state.homeRedirect) {return <Redirect to={{
      pathname: '/',
      state: {}
    }} />;};
    return (
      <React.Fragment>
        <div className="modal-container">
          <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h1 className="Locations-title">List a Spot</h1>
                <div>
                  List a Spot for {this.state.street1} , {this.state.street2}
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button 
                    type="button" 
                    className={'btn btn-primary ' + (this.state.reservedToggle ? '': 'active')} 
                    onClick={() => this.changeView(false)}
                  > I noticed a Spot </button>
                  <button 
                    type="button" 
                    className={'btn btn-primary ' + (this.state.reservedToggle ? 'active': '')} 
                    onClick={() => this.changeView(true)}
                  > I am holding a Spot </button>
                </div>

                <form id="add-location" onSubmit={this.submitForm}>
                  {this.displayTimeForReservedSpots()}
                  <button>+</button>
                </form>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
    );
  };
};

export default compose(
  graphql(addSpotMutation, {name: "addSpotMutation"})
)(AddSpot);
