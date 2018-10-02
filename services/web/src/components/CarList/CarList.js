import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import './CarList.css';
import { getCarsQuery } from '../../queries/queriesCar';
import Car from '../Car/Car'
import AddCar from '../AddCar/AddCar';


class CarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.displayCars = this.displayCars.bind(this);
    this.displayCarList = this.displayCarList.bind(this);
  }

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
            <Car car={car} />
          </div>
        );
      })
    }
  }
  
  displayCarList() {
    const {user_id} = this.props
    if (user_id) {
      return (
        <div>
          {this.displayCars()}
        </div>
      );
    } else {
      return (
        <div>
          Add a Car!
        </div>
      )
    }
  }

  render() {
    console.log(this.props);
    return (
      <div className="Cars">
        <header className="Login-header">
          <h1 className="cars-title">Your Cars</h1>
        </header>
        <AddCar user_id={this.props.user_id}/>
        {this.displayCarList()}
      </div>
    );
  }
}

export default graphql(getCarsQuery, {
  options: (props) => {
    return {
      variables: {
        user_id: props.user_id
      }
    }
  }
})(CarList);
