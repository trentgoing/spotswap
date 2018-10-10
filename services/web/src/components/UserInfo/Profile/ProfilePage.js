import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router';
import { editListingMutation } from'../../../queries/queriesListing';
import { Button, Modal } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import CarList from '../Car/CarList/CarList';
import LocationList from '../Location/LocationList/LocationList';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toogleCarList: false,
      username: '',
      firstName: '',
      lastName: '',

    };
  };




  render() {

    return (
      <React.Fragment>
        <div>
          <div>
            Username: { this.state.username ? this.state.username : 
              <input type="text"/> }
          </div>
          <div>
            First Name: { this.state.firstName ? this.state.firstName : 
              <input type="text"/> }
          </div>
          <div>
            Last Name: { this.state.lastName ? this.state.lastName : 
              <input type="text"/> }
          </div>
          <div>
            Default Car:
            <CarList />
          </div>
          <div>
            <LocationList />
          </div>
        </div>
      </React.Fragment>
    );
  };
};

export default ProfilePage;