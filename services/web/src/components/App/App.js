import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Login from '../Login/Login.js';
import AddSpot from '../AddSpot/AddSpot.js';
import LocationList from '../LocationList/LocationList.js';
import CarList from '../CarList/CarList.js';
import SpotsList from '../SpotsList/SpotsList';
import Header from '../Header/Header';
import ClaimSpot from '../ClaimSpot/ClaimSpot';
import Map from '../Map/Map';

class App extends Component {
  constructor(props){
    super(props);
  };

  render() {
    return (
        <div className="App">
          <Header />
          <br></br><br></br>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/map/1" />} />
            <Route exact path="/addSpot" component={AddSpot} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/spots" component={SpotsList} />
            <Route exact path="/locations" component={LocationList} />
            <Route exact path="/cars" component={CarList} />
            <Route exact path="/map/:id" component={Map} />
            <Route exact path="/claimSpot" component={ClaimSpot} />
          </Switch>
          {/* <Login />
          <AddSpot user_id={this.state.user_id} />
          <SpotsList />
          <LocationList user_id={this.state.user_id}/>
          <CarList user_id={this.state.user_id}/> */}
        </div>
    );
  };
};

export default App;
