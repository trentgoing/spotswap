import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login.js';
import AddSpot from '../AddSpot/AddSpot.js';
import LocationList from '../LocationList/LocationList.js';
import CarList from '../CarList/CarList.js';
import SpotsList from '../SpotsList/SpotsList';
import Map from '../Map/Map';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id: "1",
      
    }
  }

  render() {
    return (
        <div className="App">
          <br/>
          <br/>
          <br/>
          <Map user_id={this.state.user_id} />
          {/* <Login />
          <AddSpot user_id={this.state.user_id} />
          <SpotsList />
          <LocationList user_id={this.state.user_id}/>
          <CarList user_id={this.state.user_id}/> */}
        </div>
    );
  }
}

export default App;
