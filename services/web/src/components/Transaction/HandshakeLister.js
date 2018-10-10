import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { getListingsQuery } from '../../queries/queriesListing';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Reserving from './HandshakeModals/Reserving';
import Claimed from './HandshakeModals/Claimed';
import Success from './HandshakeModals/Success';
import './HandshakeLister.css';

const CHANGED_LISTINGS_SUBSCRIPTION = gql`
  subscription {
    listingUpdate {
      node {
        id
        status
        spot{
          id
          end_time
        }
        claiming_user {
          user_name
          id
          default_car{
            model
            color
          }
        }
      }
    }
  }
`;

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
        // const updatedListing = subscriptionData.data.listingUpdate.node;
        // var listings = [updatedListing, ...prev.myListings];

        // var newListingsObj = {
        //   listings: listings,
        //   __typename: "myListings"
        // };
        // this.addSpot(listings);
      }
    })
  }

  handleClose() {
    console.log(this.props);
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
      return <Reserving listing={listing} handleClose={this.handleClose}/>
    } else if (listing.status === 2) {
      return <Claimed listing={listing} handleClose={this.handleClose} />
    } else if (listing.status === 8) {
      return <Success listing={listing} handleClose={this.handleClose} />;
    }else if (listing.status === 3) {
      return (
        <div key={listing.id}>
          YOUR RESERVATION TIMED OUT
          {JSON.stringify(listing)}
        </div>
      );
    } else if (listing.status === 4) {
      return (
        <div key={listing.id}>
          THE CLAIMER OF THIS SPOT SAYS YOU WEREN'T THERE
          {JSON.stringify(listing)}
        </div>
      );
    } else if (listing.status === 7) {
      return (
        <div key={listing.id}>
          THE CLAIMER OF THIS SPOT CANCELLED!
          {JSON.stringify(listing)}
        </div>
      );
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
