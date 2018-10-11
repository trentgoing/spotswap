import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { getListingsQuery, CHANGED_LISTINGS_SUBSCRIPTION } from '../../queries/queriesListing';
import { Query } from 'react-apollo';
import Reserving from './HandshakeModals/Reserving';
import Claimed from './HandshakeModals/Claimed';
import Success from './HandshakeModals/Success';
import Failed from './HandshakeModals/Failed';
import './HandshakeLister.css';

class HandshakeLister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: true,
      homeRedirect: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.openModal = this.openModal.bind(this);
  };

  _subscribeToUpdatedListings = subscribeToMore => {
    subscribeToMore({
      document: CHANGED_LISTINGS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
      }
    })
  }

  handleClose() {
    this.setState({
      modalShow: false
    })
  }

  openModal() {
    console.log('open the damn modal')
    this.setState({
      modalShow: true
    })
  }

  displayListingStatus(listing) {
    if (listing.status === 1) {
      return <Reserving listing={listing} handleClose={this.handleClose} key={listing.id}/>
    } else if (listing.status === 2) {
      return <Claimed listing={listing} handleClose={this.handleClose}  key={listing.id}/>
    } else if (listing.status === 8) {
      return <Success listing={listing} handleClose={this.handleClose}  key={listing.id}/>;
    } else  {
      return <Failed listing={listing} handleClose={this.handleClose}  key={listing.id}/>;
    } 
  }

  render() {
    return (
      <React.Fragment>
        <Query query={getListingsQuery} >
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;
          this._subscribeToUpdatedListings(subscribeToMore);
          if (data.myListings.length > 0) {
            return (
              <div className="modal-container">
                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                  <Modal.Header>
                    <Modal.Title>Current Swaps</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div id="modal-content">
                      
                      {data.myListings.map((listing) => {
                        return this.displayListingStatus(listing);
                      })}
                    
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            );
          } else {
            return <React.Fragment></React.Fragment>
          }
        }}
        </Query>
      </React.Fragment>
    );
  }
};

export default HandshakeLister;
