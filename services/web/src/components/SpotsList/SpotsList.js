import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getSpotsQuery } from '../../queries/queriesSpot';
import Spot from '../Spot/Spot.js'


class SpotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.displaySpots = this.displaySpots.bind(this);
  };

  displaySpots() {
    var data = this.props.data;
    console.log
    if (data.loading || data.spots === undefined) {
      return (
        <div> Loading... </div>
      );
    } else if (data.spots.length === 0) {
      return (
        <div> No Spots Currently Available! </div>
      );
    } else {
      data.spots.forEach((spot) => {
        console.log(this.props);
        if(!(this.props.map.getSource(`${spot.id}`))) {
          let geojson = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [spot.lng, spot.lat]
                }
            }]
          };
          this.props.map.addSource(`${spot.id}`, {
            "type": "geojson",
            "data": geojson
          });
          this.props.map.addLayer({
            "id": `${spot.id}`,
            "type": "circle",
            "source": `${spot.id}`,
            "paint": {
                "circle-radius": 10,
                "circle-color": "#f44242"
            }
          });
        }
      });
    }
  };

  render() {
    return (
      <div className="Spots">
        <header className="Login-header">
          <h1 className="Spots-title">Spots</h1>
        </header>
        {this.displaySpots()}
      </div>
    );
  }
};

export default graphql(getSpotsQuery, {
  options: (props) => {
    return {
      variables: {
      }
    }
  }
})(SpotList);
