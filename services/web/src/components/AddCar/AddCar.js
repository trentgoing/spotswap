import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import './AddCar.css';
import { getCarsQuery, addCarMutation } from '../../queries/queriesCar';


class AddCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '',
      make: '',
      model: '',
      color: '',
      plate: '',
      state: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  submitForm(event) {
    event.preventDefault();
    console.log('props in addCar', this.props);
    this.props.addCarMutation({
      variables: {
        user_id: this.props.user_id,
        size: parseInt(this.state.size, 10),
        make: this.state.make,
        model: this.state.model,
        color: this.state.color,
        plate: this.state.plate,
        state: this.state.state,
      },
      refetchQueries: [{query: getCarsQuery, variables: {user_id: this.props.user_id}}]
    })
      .then(() => {
        console.log('New car submitted!');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <form id="add-car" onSubmit={this.submitForm}>
          <div className="dropdown">
            <select name="size" onChange={(event) => this.handleInputChange(event)} value={this.state.size}>
              <option value="1">Small</option>
              <option value="2">Medium</option>
              <option value="3">Large</option>
            </select>
          </div>
          <div className="field">
              <label>Make:</label>
              <input type="text" name="make" onChange={(event) => this.handleInputChange(event)} value={this.state.make}/>
          </div>
          <div className="field">
              <label>Model:</label>
              <input type="text" name="model" onChange={(event) => this.handleInputChange(event)} value={this.state.model}/>
          </div>
          <div className="field">
              <label>Color:</label>
              <input type="text" name="color" onChange={(event) => this.handleInputChange(event)} value={this.state.color}/>
          </div>
          <div className="field">
              <label>Plate:</label>
              <input type="text" name="plate" onChange={(event) => this.handleInputChange(event)} value={this.state.plate}/>
          </div>
          <div className="field">
              <label>State:</label>
              <input type="text" name="state" onChange={(event) => this.handleInputChange(event)} value={this.state.state}/>
          </div>
          <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(addCarMutation, { name: "addCarMutation" })
)(AddCar);
