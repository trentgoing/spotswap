import React, { Component } from 'react';
import { graphql, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { getSpotsQuery } from '../../../queries/queriesSpot';


class SpotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.displaySpots = this.displaySpots.bind(this);
  };

  displaySpots(data) {
    
      data.openSpot.forEach((spot) => {
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
            "type": "circle",
            "source": `${spot.id}`,
            "paint": {
                "circle-radius": 10,
                "circle-color": `${spot.type === 1 ? '#f4f142' : '#f44242'}`
            }
          });

          this.props.map.on('mouseenter', `${spot.id}`, () => {
            this.props.map.getCanvas().style.cursor = 'pointer';
          });
      
          // Change it back to a pointer when it leaves.
          this.props.map.on('mouseleave', `${spot.id}`, () => {
            this.props.map.getCanvas().style.cursor = '';
          });

          this.props.map.on('click', `${spot.id}`, (e) => {
            console.log("YO YOU WANNA CLAIM THIS SPOT?" + e.features[0].properties.spot_id);
            let spot = e.features[0].properties.spot_id;
            this.props.claimSpot(spot);
          });

        }
      });
  };

  render() {
    return (
      <div className="Spots">
        <header className="Login-header">
          <h1 className="Spots-title">Spots</h1>
        </header>
        <Query 
          query={getSpotsQuery}
        >
          {({ loading, error, data, subscribeToMore }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error</div>;
            if (data) this.displaySpots(data)
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