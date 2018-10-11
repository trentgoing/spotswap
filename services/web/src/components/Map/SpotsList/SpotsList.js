import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { getSpotsQuery } from '../../../queries/queriesSpot';
import gql from 'graphql-tag';


const NEW_SPOTS_SUBSCRIPTION = gql`
  subscription {
    newSpot {
      node {
        id
        lat
        lng
        is_available
        type
        listing {
          id
        }
      }
    }
  }
`;

class SpotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: []
    }
    this.displaySpots = this.displaySpots.bind(this);
    this.addSpot = this.addSpot.bind(this);
  };

  _subscribeToNewSpots = subscribeToMore => {
    subscribeToMore({
      document: NEW_SPOTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newSpot = subscriptionData.data.newSpot.node;

        var openSpots = [newSpot, ...prev.openSpot];

        var newSpotObj = {
          openSpot: openSpots,
          __typename: "openSpot"
        };
        console.log(newSpot);
        if(newSpot.is_available) {
          this.addSpot(newSpot);
        } else {
          this.removeSpot(newSpot);
        }
      }
    })
  }

  addSpot(spot) {
    console.log('Adding');
    if(!(this.props.map.getSource(`${spot.id}`))) {
      let geojson = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {
              "spot_id": spot.id,
            },
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
        "type": "symbol",
        "source": `${spot.id}`,
        "layout": {
          "icon-image": `${spot.type === 1 ? 'blue-meter' : 'green-meter'}`,
          "icon-size": 0.25,
          "icon-allow-overlap": true
      }
        // "paint": {
        //     "circle-radius": 10,
        //     "circle-color": `${spot.type === 1 ? '#f4f142' : '#f44242'}`
        // }
      });

      this.props.map.on('mouseenter', `${spot.id}`, () => {
        this.props.map.getCanvas().style.cursor = 'pointer';
      });
  
      // Change it back to a pointer when it leaves.
      this.props.map.on('mouseleave', `${spot.id}`, () => {
        this.props.map.getCanvas().style.cursor = '';
      });

      this.props.map.on('click', `${spot.id}`, () => {
        console.log(`YO YOU WANNA CLAIM THIS SPOT? ${spot.id}`);
        this.props.claimSpot(spot);
      });
    }
  }

  removeSpot(spot) {
    console.log('Removing');
    if((this.props.map.getSource(`${spot.id}`))) {
      this.props.map.removeSource(spot.id);
      this.props.map.removeLayer(spot.id);
    }
  }

  displaySpots(data) {
    this.state.spots = data.openSpot;
    data.openSpot.forEach((spot) => {
      this.addSpot(spot);
    });
  };

  render() {
    return (
      <div className="Spots">
        <Query query={getSpotsQuery}>
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;

            this._subscribeToNewSpots(subscribeToMore);
            
            if (data.openSpot.length !== this.state.spots.length) this.displaySpots(data)
              return (
                <div></div>
              );
          }}
        </Query>
      </div>
    );
  }
};

export default withRouter(SpotList);