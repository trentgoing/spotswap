import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { getListingsQuery, editListingMutation } from '../../../queries/queriesListing';
import moment from 'moment';

var Reserving = function({listing}) {
  return (
    <React.Fragment>
      <div key={listing.id}>
        <p>Hello, you are reserving spot #{listing.spot.id}</p>
        <p>You are holding me for the next {(moment(listing.spot.end_time).fromNow())}.</p>
        <Mutation
          mutation={editListingMutation}
          variables={{
            spot_id: listing.spot.id,
            listing_id: listing.id,
            status: 6
          }}
          onCompleted={() => this.props.history.push('/')}
        >
          {editListing => <button onClick={() => {
            editListing();
            this.handleClose();
          }}>Cancel</button>}
        </Mutation>
      </div>
    </React.Fragment>
  )
}

export default Reserving;


