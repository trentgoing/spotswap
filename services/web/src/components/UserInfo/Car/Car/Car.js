import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import './Car.css';

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div>
        <p>
          <b>{this.props.car.make}</b>   <button onClick={() => {this.props.deleteCar(this.props.car.id)}}>-</button><br/>
            {this.props.car.model + ', ' + this.props.car.color}
        </p>
      </div>
    );
  };
};

export default Car;



