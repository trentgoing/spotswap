import React, { Component } from 'react';
import { graphql, compose, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { getSpotsQuery, editSpotMutation } from '../../../queries/queriesSpot';
import moment from 'moment';

class ClaimReserved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.changeState = this.changeState.bind(this);
  };

  changeState() {
    this.setState({
      clicked: true
    })
  };

  render() {
    const id = this.props.location.state.spot;
    if (!this.state.clicked) {
      return (
        <div>
          <div>This spot is being held for X mins</div>
          <button onClick={this.changeState}>Claim Spot</button>
        </div>
      );
    }
    else {
      return (
        <div>
          <div>Are you sure?</div>
          <Mutation
            mutation={editSpotMutation}
            variables={{id}}
            onCompleted={() => this.props.history.push('/')}
          >
            {editSpot => <button onClick={editSpot}>Claim Spot</button>}
          </Mutation>
        </div>
      )
    }
  };
};

export default withRouter(ClaimReserved);

//need to editListing too so to change status of listing