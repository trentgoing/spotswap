import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import './LocationList.css';
import { getLocationsQuery, deleteLocationMutation } from '../../queries/queriesLocation';
import Location from '../Location/Location.js'
import AddLocation from '../AddLocation/AddLocation';


class LocationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.displayLocations = this.displayLocations.bind(this);
    this.displayLocationList = this.displayLocationList.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
  }

  displayLocations() {
    var data = this.props.data;
    if (data.loading || data.locations === undefined) {
      return (
        <div> Loading... </div>
      )
    } else {
      return data.locations.map((location) => {
        return (
          <div key={location.id}>
            <Location location={location} deleteLocation={this.deleteLocation}/>
          </div>
        );
      })
    }
  }
  
  displayLocationList() {
    const {user_id} = this.props
    if (user_id) {
      return (
        <div>
          {this.displayLocations()}
        </div>
      );
    } else {
      return (
        <div>
          Add a Location!
        </div>
      )
    }
  }

  deleteLocation() {
    this.props.deleteLocationMutation({
      variables: {
        user_id: this.props.user_id,
        id: this.props.location.id
      },
      refetchQueries: [{query: getLocationsQuery, variables: {user_id: this.props.user_id}}]
    })
    .then(() => {
      console.log('Location deleted!');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    console.log('props in LocationList', this.props);
    return (
      <div className="Locations">
        <header className="Login-header">
          <h1 className="Locations-title">Your Locations</h1>
        </header>
        <AddLocation user_id={this.props.user_id}/>
        {this.displayLocationList()}
      </div>
    );
  }
}

export default compose(
  graphql(getLocationsQuery, {
    options: (props) => {
      return {
        variables: {
          user_id: props.user_id
        }
      }
    }
  }),
  graphql(deleteLocationMutation, {name: "deleteLocationMutation"})
)(LocationList);
