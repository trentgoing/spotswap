import React, { Component } from 'react';
import { graphql, compose, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { editSpotMutation } from '../../../queries/queriesSpot';
import { editListingMutation } from'../../../queries/queriesListing';
import moment from 'moment';

class ClaimSpotted extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    const id = this.props.location.state.spot;
    return (
      <div>
        <div>Parking spot was seeing here X mins ago</div>
        <Mutation
          mutation={editSpotMutation}
          variables={{id}}
          onCompleted={() => this.props.history.push('/')}
        >
          {editSpot => <button onClick={editSpot}>Claim</button>}
        </Mutation>
      </div>
    );
  };
};

export default withRouter(ClaimSpotted);


//beware that in SpotsList and Map, it's called ClaimSpot;