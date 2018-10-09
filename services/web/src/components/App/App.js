import React, { Component } from 'react';
import './App.css';
import MapComp from '../Map/Map';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import Login from '../Login/Login.js';
// import AddSpot from '../Transaction/AddSpot/AddSpot';
// import LocationList from '../UserInfo/Location/LocationList/LocationList';
// import CarList from '../UserInfo/Car/CarList/CarList';
// import SpotsList from '../Map/SpotsList/SpotsList';
// import ClaimSpotted from '../Transaction/ClaimSpotted/ClaimSpotted';
// import ClaimReserved from '../Transaction/ClaimReserved/ClaimReserved';

class App extends Component {

  render() {
    return (
        <div className="App">
          <MapComp />
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
