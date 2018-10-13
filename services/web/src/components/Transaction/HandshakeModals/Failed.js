import React from 'react';
import { Button } from 'react-bootstrap';

var Reserving = function({listing, handleClose}) {
  return (
    <React.Fragment>
      <div key={listing.id}>
        <h3>Oops!</h3>
        {listing.status === 4 && <p>Oops, your spot closed because you weren't there!</p>}
        {listing.status === 5 && <p>Oops, your spot closed because you weren't there!</p>}
        {listing.status === 6 && <p>Sorry, the spot swap was cancelled by the other user!</p>}
        {listing.status === 7 && <p>Sorry, the spot swap was cancelled by the other user!</p>}
        <Button onClick={() => {
            handleClose();
          }}
        >
          Close
        </Button>
      </div>
    </React.Fragment>
  )
}

export default Reserving;


