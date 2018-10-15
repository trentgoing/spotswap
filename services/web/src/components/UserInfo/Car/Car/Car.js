import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Mutation, Query } from 'react-apollo';
import './Car.css';
import { deleteCarMutation } from '../../../../queries/queriesCar';

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  };

  render() {
  
    return (
      <div>
        <p>
          <b>{this.props.car.make}</b>   <button onClick={() => {this.props.deleteCar(this.props.car.id)}}>-</button><br/>
          {this.props.car.model + ', ' + this.props.car.color}
        </p>
      </div>
    )
  };
};

export default Car;



