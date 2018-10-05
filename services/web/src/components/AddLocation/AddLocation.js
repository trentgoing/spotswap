import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'

import './AddLocation.css';
// import { addLocationMutation, getLocationsQuery } from '../../queries/queriesLocation';

const addLocationMutation = gql`
  mutation AddLocation (
      $name: String,
      $street1: String,
      $street2: String,
      $city: String,
      $state: String,
      $zip: Int
    ) {
    addLocation(
      name: $name,
      street1: $street1,
      street2: $street2,
      city: $city,
      state: $state,
      zip: $zip
    ){
      id
      name
    }
  }
`;

class AddLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.submitForm = this.submitForm.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  // submitForm(event) {
  //   event.preventDefault();
  //   console.log('props in addLocation', this.props);
  //   this.props.addLocationMutation({
  //     variables: {
  //       name: this.state.name,
  //       street1: this.state.address1,
  //       street2: this.state.address2,
  //       city: this.state.city,
  //       state: this.state.state,
  //       zip: parseInt(this.state.zip, 10),
  //       user_id: this.props.user_id
  //     },
  //     refetchQueries: [{query: getLocationsQuery, variables: {user_id: this.props.user_id}}]
  //   })
  //     .then(() => {
  //       console.log('submitted!');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  
  render() {
    const { name, street1, street2, city, state } = this.state
    const zip = parseInt(this.state.zip)
    return (
      <div>
          <div className="field">
              <label>Location name:</label>
              <input type="text" name="name" onChange={(event) => this.handleInputChange(event)} value={this.state.name}/>
          </div>
          <div className="field">
              <label>Address 1:</label>
              <input type="text" name="address1" onChange={(event) => this.handleInputChange(event)} value={this.state.address1}/>
          </div>
          <div className="field">
              <label>Address 2:</label>
              <input type="text" name="address2" onChange={(event) => this.handleInputChange(event)} value={this.state.address2}/>
          </div>
          <div className="field">
              <label>City:</label>
              <input type="text" name="city" onChange={(event) => this.handleInputChange(event)} value={this.state.city}/>
          </div>
          <div className="field">
              <label>State:</label>
              <input type="text" name="state" onChange={(event) => this.handleInputChange(event)} value={this.state.state}/>
          </div>
          <div className="field">
              <label>Zip:</label>
              <input type="text" name="zip" onChange={(event) => this.handleInputChange(event)} value={this.state.zip}/>
          </div>
          <Mutation
            mutation={addLocationMutation}
            variables={{ name, street1, street2, city, state, zip}}
            // onCompleted={() => this.props.history.push('/new/1')}
          // update={(store, { data: { addLocation } }) => {
          //   const data = store.readQuery({
          //     query: getLocationsQuery,
          //   })
          //   data.feed.links.unshift(addLocation)
          //   store.writeQuery({
          //     query: getLocationsQuery,
          //     data,
          //     variables: { first, skip, orderBy },
          //   })
          // }}
          >
          {addLocation => <button onClick={addLocation}>+</button>}
        </Mutation>
        </div>
    );
  }
}

export default AddLocation;
