import React, { Component } from 'react';
import { Mutation, Query, graphql, compose } from 'react-apollo';
import { Button, Modal, Form } from 'react-bootstrap';
import './CarList.css';
import { getCarsQuery, deleteCarMutation, editCarMutation } from '../../../../queries/queriesCar';
import Car from '../Car/Car';

class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayCars = this.displayCars.bind(this);
    this.displayCarList = this.displayCarList.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
    this.editDefaultCar = this.editDefaultCar.bind(this);
  };

  editDefaultCar(carId) {
    this.props.editCarMutation({
      mutation: editCarMutation,
      variables: {
        id: carId,
        default_car: true
      }
    })
    .then(({data}) => {
      console.log('car has been edited', data);
    })
    .catch((err) => {
      console.log('Error caught in CarList in editDefaultCar', err);
    })
  };

  displayCars() {
    var data = this.props.data;
    if (data.loading || data.cars === undefined) {
      return (
        <div> Loading... </div>
      )
    } else {
      return data.cars.map((car) => {
        return (
          <div key={car.id}>
                <Form.Check 
                  id={car.id}
                  label={<Car car={car} deleteCar={this.deleteCar} />}
                  onClick={() => {
                    this.props.changeDefaultCar(car);
                    this.editDefaultCar(car.id);
                  }}
                >
            </Form.Check>
          </div>
        );
      })
    }
  };
  
  displayCarList() {
    return (
      <Form>
      {this.displayCars()}
      </Form>
    );
  };

  deleteCar(carId) {
    this.props.deleteCarMutation({
      variables: {
        id: carId
      },
    })
    .then(() => {
      console.log('Car deleted!');
    })
    .catch((err) => {
      console.log('Error in CarList.js', err);
    })
  };

  render() {
    return (
      <div className="Cars">
        <header className="Login-header">
        </header>
        {this.displayCarList()}
      </div>
    );
  }
};

export default compose(
  graphql(getCarsQuery, {
    options: (props) => {
      return {
        variables: {
          user_id: props.user_id
        }
      }
    }
  }),
  graphql(editCarMutation, {name: "editCarMutation"}),
  graphql(deleteCarMutation, {name: "deleteCarMutation"})
)(CarList);