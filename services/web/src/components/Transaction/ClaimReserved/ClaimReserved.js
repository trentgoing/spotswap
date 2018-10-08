import React, { Component } from 'react';
import { graphql, compose, Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { getSpotsQuery, editSpotMutation } from '../../../queries/queriesSpot';
import { editListingMutation } from'../../../queries/queriesListing';
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
    const spot_id = this.props.location.state.spotId;
    const listing_id = this.props.location.state.listingId;
    const time = moment(this.props.location.state.end_time) - moment(this.props.location.state.start_time);
    console.log('time', time);
    if (!this.state.clicked) {
      return (
        <div>
          <div>This spot is being held for {time} mins</div>
          <button onClick={this.changeState}>Claim Spot</button>
        </div>
      );
    }
    else {
      return (
        <div>
          <div>Are you sure?</div>
          <Mutation
            mutation={editListingMutation}
            variables={{
              spot_id: spot_id,
              listing_id: listing_id,
              status: 2
            }}
            onCompleted={() => this.props.history.push('/')}
          >
            {editSpotListing => <button onClick={editSpotListing}>Claim Spot</button>}
          </Mutation>
        </div>
      )
    }
  };
};

export default withRouter(ClaimReserved);

//need to editListing too so to change status of listing