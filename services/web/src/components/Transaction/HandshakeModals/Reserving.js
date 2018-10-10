import React from 'react';
import { Mutation } from 'react-apollo';
import { editListingMutation } from '../../../queries/queriesListing';
import moment from 'moment';

var Reserving = function({listing, handleClose}) {
  return (
    <React.Fragment>
      <div key={listing.id}>
        <p>You are holding a spot to be swapped near </p>
        <p>{listing.spot.street1}, {listing.spot.street2} {listing.spot.city}</p>
        <p>Your listing of this spot will expire {(moment(listing.spot.end_time).fromNow())}.</p>
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
            handleClose();
          }}>Cancel this listing</button>}
        </Mutation>
      </div>
    </React.Fragment>
  )
}

export default Reserving;


