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
    this.changeState = this.changeState.bind(this);
  };

  changeState() {
    this.setState({
      clicked: true
    })
  };

  render() {
    const spot_id = this.props.location.state.spotId;
    const listing_id = this.props.location.state.listingId;
    if (!this.state.clicked) {
      return (
        <div>
          <div>Parking spot was seeing here X mins ago</div>
          <Mutation
            mutation={editListingMutation}
            variables={{
              spot_id: spot_id,
              listing_id: listing_id,
              status: 3
            }}
            onCompleted={() => this.props.history.push('/')}
          >
            {editSpotListing => <button onClick={() => {
              editSpotListing();
              this.changeState();
            }}>Spot No Longer Available</button>}
          </Mutation>
  
          <Mutation
            mutation={editListingMutation}
            variables={{
              spot_id: spot_id,
              listing_id: listing_id, 
              status: 2
            }}
            onCompleted={() => this.props.history.push('/')}
          >
            {editSpotListing => <button onClick={() => {
              editSpotListing();
              this.changeState();
            }}>I Parked Here</button>}
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