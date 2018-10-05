import React, { Component } from 'react';
import './Spot.css';

class Spot extends Component {
  render() {
    return (
      <div>
        {JSON.stringify(this.props.spot)}
        {this.props.spot.type === "spotted" ? ": Spotted" : ": Reserved"}
      </div>
    );
  }
}

export default Spot;
