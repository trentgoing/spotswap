import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getSpotsQuery, editSpotMutation } from '../../queries/queriesSpot';
import moment from 'moment';

class ClaimSpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.claimSpot = this.claimSpot.bind(this);
  };


  claimSpot(event) {
    event.preventDefault();
    this.props.editSpotMutation({
      variables: {
        id: this.props.location.state.spot
      },
      refetchQueries: [{query: getSpotsQuery, variables: {}}]
    })
    .then(() => {
      console.log('Spot claimed');
    })
    .catch((err) => {
      console.log(err);
    })
  };

  render() {
    return (
      <div>
        <button onClick={this.claimSpot}>Claim</button>
      </div>
    );
  };
};

export default compose(
  graphql(editSpotMutation, {name: "editSpotMutation"})
)(ClaimSpot);