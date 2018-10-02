import React, { Component } from 'react';
import './Location.css';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }


  render() {
    return (
      <div>
        <p>
          <b>{this.props.location.name}</b><br/>
          {this.props.location.street1 + ', ' + this.props.location.city}
        </p>
      </div>
    );
  }
}

export default Location;
