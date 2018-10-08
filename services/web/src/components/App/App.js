import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import MapComp from '../Map/Map';
import Login from '../Login/Login.js';
import AddSpot from '../Transaction/AddSpot/AddSpot';
import LocationList from '../UserInfo/Location/LocationList/LocationList';
import CarList from '../UserInfo/Car/CarList/CarList';
import SpotsList from '../Map/SpotsList/SpotsList';
import Header from '../Header/Header';
import ClaimSpot from '../Transaction/ClaimSpot/ClaimSpot';

class App extends Component {
  constructor(props){
    super(props);
  };

  render() {
    return (
        <div className="App">
          <Header />
          <MapComp />
          <br></br><br></br>
          {/* <Switch>
            <Route exact path="/" render={() => <Redirect to="/map/1" />} />
            <Route exact path="/addSpot" component={AddSpot} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/spots" component={SpotsList} />
            <Route exact path="/locations" component={LocationList} />
            <Route exact path="/cars" component={CarList} />
            <Route exact path="/map/:id" component={MapComp} />
            <Route exact path="/claimSpot" component={ClaimSpot} />
          </Switch> */}
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
