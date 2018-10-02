import React, { Component } from 'react';

import { graphql, compose } from 'react-apollo';

import { addSpotMutation, getSpotsQuery } from '../../queries/queriesSpot';

// THIS IS THE FORM TO ADD A SPOT
class AddSpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservedToggle: false,
      start_time: Date.now(),
      end_time: Date.now(),
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    };

    this.changeView = this.changeView.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.displayTypeOfSpotToList = this.displayTypeOfSpotToList.bind(this);
  }

  changeView(arg) {
    this.setState({
      reservedToggle: arg
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  submitForm(event) {
    event.preventDefault();
    console.log('props in addSpot', this.props);
    this.props.addSpotMutation({
      variables: {
        user_id: this.props.user_id,
        street1: this.state.street1,
        street2: this.state.street2,
        city: this.state.city,
        state: this.state.state,
        zip: parseInt(this.state.zip, 10),
        type: this.state.reservedToggle ? 'reserved' : 'spotted',
        start_time: this.state.start_time || Date.now(),
        end_time: this.state.end_time
      },
      refetchQueries: [{query: getSpotsQuery, variables: {}}]
    })
  }

  displayTypeOfSpotToList() {
    if (this.state.reservedToggle) {
      return (
        <div>
          <p>I will hold this spot</p>
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
          <p>I saw an open spot at </p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1 className="Locations-title">List a Spot</h1>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button 
            type="button" 
            className={'btn btn-primary ' + (this.state.reservedToggle ? '': 'active')} 
            onClick={() => this.changeView(false)}
          >I noticed a Spot</button>
          <button 
            type="button" 
            className={'btn btn-primary ' + (this.state.reservedToggle ? 'active': '')} 
            onClick={() => this.changeView(true)}
          >I am holding a Spot</button>
        </div>

        <form id="add-location" onSubmit={this.submitForm}>

          {this.displayTypeOfSpotToList()}
          <div className="field">
              <label>Address 1:</label>
              <input type="text" name="street1"  autoComplete="new-password" onChange={(event) => this.handleInputChange(event)} value={this.state.street1}/>
          </div>
          <div className="field">
              <label>Address 2:</label>
              <input type="text" name="street2"  autoComplete="new-password" onChange={(event) => this.handleInputChange(event)} value={this.state.street2}/>
          </div>
          <div className="field">
              <label>City:</label>
              <input type="text" name="city"  autoComplete="new-password" onChange={(event) => this.handleInputChange(event)} value={this.state.city}/>
          </div>
          <div className="field">
              <label>State:</label>
              <input type="text" name="state"  autoComplete="new-password" onChange={(event) => this.handleInputChange(event)} value={this.state.state}/>
          </div>
          <div className="field">
              <label>Zip:</label>
              <input type="text" name="zip"  autoComplete="off" onChange={(event) => this.handleInputChange(event)} value={this.state.zip}/>
          </div>
          <button>+</button>
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(addSpotMutation, {name: "addSpotMutation"})
)(AddSpot);
