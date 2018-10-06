import React, { Component } from 'react';
import { graphql, compose, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { getSpotsQuery, editSpotMutation } from '../../queries/queriesSpot';
import moment from 'moment';

class ClaimSpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };

  render() {
    const id = this.props.location.state.spot;
    return (
      <div>
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

export default withRouter(ClaimSpot);