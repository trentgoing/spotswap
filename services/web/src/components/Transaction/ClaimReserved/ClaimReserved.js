import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { editListingMutation } from'../../../queries/queriesListing';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class ClaimReserved extends Component {
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
                  <div>This spot is being held for X mins</div>
                  <button onClick={this.changeState}>Claim Spot</button>
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
      if (this.state.homeRedirect) {
        return <Redirect to={{
                  pathname: '/',
                  state: {}
                }} />;
      };
      return (
        <React.Fragment>
          <div className="modal-container">
            <Modal show={this.state.modalShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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

export default withRouter(ClaimReserved);

//need to editListing too so to change status of listing