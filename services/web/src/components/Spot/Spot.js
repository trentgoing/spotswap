import React, { Component } from 'react';
import './Spot.css';

class Spot extends Component {
  render() {
    return (
      <div>
        {this.props.spot.street1}
        {this.props.spot.is_available}
        
        {this.props.spot.type === "spotted" ? ": Spotted" : ": Reserved"}
      </div>
    );
  }
}

export default Spot;
