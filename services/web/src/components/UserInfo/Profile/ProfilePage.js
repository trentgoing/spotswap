import React, { Component } from 'react';
import { Mutation, Query, compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import { Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import CarList from '../Car/CarList/CarList';
import LocationList from '../Location/LocationList/LocationList';
import { getUserQuery, mutationUser } from '../../../queries/queriesUser';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empty: true,
      toogleCarList: false,
      username: '',
      firstName: '',
      lastName: '',
      defaultCar: {}
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.handleUserEdit = this.handleUserEdit.bind(this);
  };

  getUserInfo(data) {
    this.setState({
      username: data.userInfo.user_name,
      firstName: data.userInfo.first_name,
      lastName: data.userInfo.last_name,
      defaultCar: data.userInfo.default_car,
      empty: false
    })
  };

  handleUserEdit(mutation, evt) {
    evt.preventDefault();
    mutation();
  };  

  handleInputChange(event) {
    this.setState(
      { [event.target.name]: event.target.value }
    )
  };

  render() {
    if (this.state.empty) {
      return (
        <Query query={getUserQuery}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) return <div>Error {console.log({error})}</div>;
            if (data) { 
              this.getUserInfo(data); 
              return <div></div> 
            };
          }}
        </Query>
      );
    }
    else {
      return (
        <div>
          <div className="profileInfo">
            Username: { this.state.username ? this.state.username : <div>
              <input type="text" placeholder="Username" onChange={(evt) => this.handleInputChange(evt)}/><span><button>add</button></span>
              </div> }
          </div>
          <div className="profileInfo">
            First Name: { this.state.firstName ? this.state.firstName : 
              <div>
                <input type="text" placeholder="First Name" onChange={(evt) => this.handleInputChange(evt)}/><span>
                {/* <Mutation
                  mutation={mutationUser}
                  variables={{
                    first_name: this.state.firstName
                  }}
                >
                  {(editUser) => <button onClick={editUser}>add</button>}
                </Mutation> */}
                </span> 
              </div> }
          </div>
          <div className="profileInfo">
            Last Name: { this.state.lastName ? this.state.lastName :  <div>
              <input type="text" placeholder="Last Name" onChange={(evt) => this.handleInputChange(evt)}/><span><button>add</button></span>
              </div> } 
          </div>
          <div>
            Default Car: { this.state.defaultCar ? this.state.defaultCar : <span>Please add a car from your car list</span>}
          </div>
          <Button onClick={() => {this.props.history.push(`/`)}}> Go To Map </Button> 

          <div>
            <CarList />
          </div>
          <div>
            <LocationList />
          </div>
        </div>
      )


      // return (  
      //   <React.Fragment>
      //     <Form>
      //       <Form.Group controlId="exampleForm.ControlInput1">
      //       <Form.Label>Username: </Form.Label>
      //       { this.state.username ? this.state.username : 
      //       <Form.Control type="text" placeholder="Username"></Form.Control>}
      //       </Form.Group>
      //       <Form.Group controlId="exampleForm.ControlInput1">
      //       <Form.Label>First Name: </Form.Label>
      //       { this.state.firstName ? this.state.firstName : 
      //       <Form.Control type="text" placeholder="First Name"></Form.Control>}
      //       </Form.Group>
      //       <Form.Group controlId="exampleForm.ControlInput1">
      //       <Form.Label>Last Name: </Form.Label>
      //       { this.state.lastName ? this.state.lastName : 
      //       <Form.Control type="text" placeholder="Last Name"></Form.Control>}
      //       </Form.Group>
      //       <Form.Group controlId="exampleForm.ControlSelect1">
      //       <Form.Label>Your Default Car</Form.Label>
      //       <Form.Control as="select" value={this.state.defaultCar}>
      //         <CarList />
      //         {/* <option>1</option>
      //         <option>2</option>
      //         <option>3</option>
      //         <option>4</option>
      //         <option>5</option> */}
      //       </Form.Control>
      //       </Form.Group>
      //       <Mutation
      //         mutation={mutationUser}
      //         variables={{
      //           user_name: this.state.username,
      //           first_name: this.state.firstName,
      //           last_name: this.state.lastName
      //         }}
      //       >
      //         {mutation => {
      //           <Button type="submit" onClick={(evt) => {this.handleUserEdit(mutation, evt)}}>Submit Edits</Button>
      //         }}
      //       </Mutation>
      //     </Form>
      //     <Button onClick={() => {this.props.history.push(`/`)}}>Go To Map</Button> 
      //     {/*

      //         <div className="dropdown">
      //           <select name="default-car" onChange={(event) => this.handleInputChange(event)} value={this.state.defaultCar}>
                  
      //             <option value="1">Small</option>
      //             <option value="2">Medium</option>
      //             <option value="3">Large</option>
      //           </select>
      //         </div>
      //         <div>
      //           Default Car:
      //         </div>
      //       </form>
      //       <div>
      //         <CarList />
      //       </div>
      //       <div>
      //         <LocationList />
      //       </div>
      //     </div> */}
      //   </React.Fragment>
      // );
    }
  };
};

export default withRouter(ProfilePage);