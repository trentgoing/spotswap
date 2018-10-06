import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addSpotMutation, getSpotsQuery } from '../../../queries/queriesSpot';
import moment from 'moment';

// THIS IS THE FORM TO ADD A SPOT
class AddSpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservedToggle: false,
      start_time: moment().format(),
      end_time:  moment().format()
    };

    this.changeView = this.changeView.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.displayTypeOfSpotToList = this.displayTypeOfSpotToList.bind(this);
  };

  changeView(arg) {
    this.setState({
      reservedToggle: arg
    })
  };

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
      refetchQueries: [{query: getSpotsQuery, variables: {}}]
    });
  };

  displayTypeOfSpotToList() {
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
    return (
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
          {this.displayTypeOfSpotToList()}
          <button>+</button>
        </form>
      </div>
    );
  };
};

export default compose(
  graphql(addSpotMutation, {name: "addSpotMutation"})
)(AddSpot);
