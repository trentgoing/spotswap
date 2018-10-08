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
    this.state = {
      clicked: false
    };
  };

  changeState() {
    this.setState({
      clicked: true
    })
  };

  render() {
    const id = this.props.location.state.spot;
    // const statusThree = 3;
    // const statusTwo = 2;
    //mutation to edit spot and edit listing
    if (!this.state.clicked) {
      return (
        <div>
          <div>Parking spot was seeing here X mins ago</div>
          <Mutation
            mutation={editSpotMutation}
            variables={{id}}
            onCompleted={() => this.props.history.push('/')}
          >
            {editSpot => <button onClick={editSpot}>Spot No Longer Available</button>}
          </Mutation>
  
          <Mutation
            mutation={editSpotMutation}
            variables={{id}}
            onCompleted={() => this.props.history.push('/')}
          >
            {editSpot => <button onClick={editSpot}>I Parked Here</button>}
          </Mutation>
        </div>
      );
    }
    else {
      return (
        <div>
          Thank you for being a great Spotter!
        </div>
      )
    }
    
  };
};

export default withRouter(ClaimSpotted);


//beware that in SpotsList and Map, it's called ClaimSpot;