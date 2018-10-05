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
    if (data.loading || data.spots === undefined) {
      return (
        <div> Loading... </div>
      );
    } else if (data.spots.length === 0) {
      return (
        <div> No Spots Currently Available! </div>
      );
    } else {
      return data.spots.map((spot) => {
        return (
          <div key={spot.id}>
            <Spot spot={spot} />
          </div>
        );
      });
    }
  };

  render() {
    console.log(this.props);
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
