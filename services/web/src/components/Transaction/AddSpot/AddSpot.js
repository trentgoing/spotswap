import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addSpotMutation, getSpotsQuery } from '../../../queries/queriesSpot';
import moment from 'moment';
import { Button } from 'react-bootstrap/lib/Button';
import { Modal } from 'react-bootstrap/lib/Modal';
import { Redirect } from 'react-router-dom';

// THIS IS THE FORM TO ADD A SPOT
class AddSpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservedToggle: false,
      start_time: moment().format(),
      end_time:  '',
      modalShow: true,
      homeRedirect: false
    };
    
    this.handleClose = this.handleClose.bind(this);
    this.changeView = this.changeView.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.displayTimeForReservedSpots = this.displayTimeForReservedSpots.bind(this);
  };

  changeView(arg) {
    this.setState({
      reservedToggle: arg
    })
  };

  handleClose() {
    console.log('GO HOME')
    this.setState({ homeRedirect: true });
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
        status: 1
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
              <label>From:</label>
              <input type="datetime-local" name="name" onChange={(event) => this.handleInputChange(event)} value={this.state.start_time}/>
          </div>
          <div className="field">
              <label>Until:</label>
              <input type="datetime-local" name="name" onChange={(event) => this.handleInputChange(event)} value={this.state.end_time}/>
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
                  List a Spot for {this.props.location.state.lng} , {this.props.location.state.lat}
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
