import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addSpotMutation, getSpotsQuery } from '../../../queries/queriesSpot';
import moment from 'moment';

class ReservationConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  displayReservationConfirmation() {
    const time = moment(this.state.end_time) - moment(this.state.start_time);
    if (this.state.confirmationToggle) {
      return (
        <div>
          <p>You will hold this spot for {time} mins</p>
        </div>
      )
    }
  };


  render() {
    return (
      
    );
  }
}

export default ReservationConfirmation;