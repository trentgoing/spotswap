import React, { Component } from 'react';
import './Spot.css';

class Spot extends Component {
  render() {
    return (
      <div>
        {this.props.spot.street1}
        {this.props.spot.type === 1 ? ": Reserved" : ": Spotted"}
      </div>
    );
  };
};

export default Spot;
