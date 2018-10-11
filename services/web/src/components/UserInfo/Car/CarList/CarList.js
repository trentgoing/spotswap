import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import './CarList.css';
import { getCarsQuery, deleteCarMutation } from '../../../../queries/queriesCar';
import Car from '../Car/Car';
import AddCar from '../AddCar/AddCar';

class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.displayCars = this.displayCars.bind(this);
    this.displayCarList = this.displayCarList.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
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
            <Car car={car} deleteCar={this.deleteCar}/>
          </div>
        );
      })
    }
  };
  
  displayCarList() {
    return (
      <div>
        {this.displayCars()}
      </div>
    );
  };

  deleteCar(carId) {
    this.props.deleteCarMutation({
      variables: {
        // user_id: this.props.user_id,
        id: carId
      },
      // refetchQueries: [{query: getCarsQuery, variables: {user_id: this.props.user_id}}]
    })
    .then(() => {
      console.log('Car deleted!');
    })
    .catch((err) => {
      console.log('Error in CarList.js', err);
    })
  };

  render() {
    console.log('props in CarList', this.props);
    return (
      <div className="Cars">
        <header className="Login-header">
          <h1 className="cars-title">Your Cars</h1>
        </header>
        <AddCar />
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
  graphql(deleteCarMutation, {name: "deleteCarMutation"})
)(CarList);