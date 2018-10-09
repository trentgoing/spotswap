import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { editListingMutation } from'../../../queries/queriesListing';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class ClaimSpotted extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      modalShow: true,
      homeRedirect: false
    };
    this.changeState = this.changeState.bind(this);
    this.handleClose = this.handleClose.bind(this);
  };

  changeState() {
    this.setState({
      clicked: true
    })
  };

  handleClose() {
    console.log('GO HOME')
    this.setState({ homeRedirect: true });
  }

  render() {
    if (this.state.homeRedirect) {
      return <Redirect to={{
                pathname: '/',
                state: {}
              }} />;
    };
    const spot_id = this.props.location.state.spotId;
    const listing_id = this.props.location.state.listingId;
    const timeDiff = moment(this.props.location.state.start_time).from(this.props.location.state._time)
    // const timeDiff = moment(this.props.location.state.start_time).fromNow();
    if (!this.state.clicked) {
      return (
        <React.Fragment>
        <div className="modal-container">
          <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div>Parking spot was seen here {timeDiff}</div>
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
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
        
      );
    }
    else {
      return (
        <React.Fragment>
        <div className="modal-container">
          <Modal show={this.state.modalShow} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                Thank you for being a great Spotter!
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </React.Fragment>
      )
    }
    
  };
};

export default withRouter(ClaimSpotted);


//beware that in SpotsList and Map, it's called ClaimSpot;