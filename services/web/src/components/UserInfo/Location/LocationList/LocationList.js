import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Button, Modal, Form } from 'react-bootstrap';
import './LocationList.css';
import { getLocationsQuery } from '../../../../queries/queriesLocation';
import Location from '../Location/Location.js';
import AddLocation from '../AddLocation/AddLocation';


class LocationList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayLocations = this.displayLocations.bind(this);
    this.displayLocationList = this.displayLocationList.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
  };

  displayLocations() {
    return (
      <Query query={getLocationsQuery} >
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;
            return (
              data.locations.map((location) => {
               return (
                <div key={location.id}>
                  <Form.Control>
                    <Location location={location} deleteLocation={this.deleteLocation}/>
                    
                  </Form.Control>
                </div>
               )}));
        }}
      </Query>
    )
  };
  
  displayLocationList() {
    return (
      <Form>
      {this.displayLocations()}
      </Form>
    );
  };

  deleteLocation(locationId) {
    this.props.deleteLocationMutation({
      variables: {
        id: locationId
      }
    })
    .then(() => {
      console.log('Location deleted!');
    })
    .catch((err) => {
      console.log(err);
    })
  };

  render() {
    return (
      <div className="Locations">
        <header className="Login-header">
        </header>
        {this.displayLocations()}
      </div>
    );
  };
};

export default LocationList;