import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { getSpotsQuery } from '../../queries/queriesSpot';
import Spot from '../Spot/Spot.js'

const NEW_SPOTS_SUBSCRIPTION = gql`
  subscription {
    newSpot {
      node {
        id
        street1
        city
        type
        is_available
      }
    }
  }
`

class SpotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.displaySpots = this.displaySpots.bind(this);
  }

  _subscribeToNewSpots = subscribeToMore => {
    subscribeToMore({
      document: NEW_SPOTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const newSpot = subscriptionData.data.newSpot.node

        return Object.assign({}, prev, {
            spots: [newSpot, ...prev.spots],
            __typename: prev.__typename
        })
      }
    })
  }

  displaySpots() {
    // var data = this.props.data;
    // if (data.loading || data.spots === undefined) {
    //   return (
    //     <div> Loading... </div>
    //   );
    // } else if (data.spots.length === 0) {
    //   return (
    //     <div> No Spots Currently Available!</div>
    //   );
    // } else {
    //   return data.spots.map((spot) => {
    //     return (
    //       <div key={spot.id}>
    //         <Spot spot={spot} />
    //       </div>
    //     );
    //   })
    // }

    return (
      <Query query={getSpotsQuery}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          this._subscribeToNewSpots(subscribeToMore)
    
          const spotsToRender = data.spots
          console.log(spotsToRender)
          return (
            <div>
              {spotsToRender.map((spot, index) => (
                <Spot
                  key={spot.id}
                  spot={spot}
                />
              ))}
            </div>
          )
        }}
      </Query>
    )
  }

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
}

export default SpotList