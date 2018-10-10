import React, { Component } from 'react';
import './App.css';
import MapComp from '../Map/Map';
import HandshakeLister from '../Transaction/HandshakeLister';
import { AUTH_TOKEN } from '../../constants';
import { withRouter, Switch, Route } from 'react-router-dom';
import ProfilePage from '../UserInfo/Profile/ProfilePage';
import HistoryPage from '../UserInfo/History/HistoryPage';

class App extends Component {

  handshake() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if(authToken){
      return (
        <HandshakeLister />
      );
    } else {
      return (
        <React.Fragment></React.Fragment>
      )
    }
  };

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/profilePage" component={ProfilePage} />
          <Route exact path="/historyPage" component={HistoryPage} />
          <div className="App">
            <MapComp />
            <br></br><br></br>
            {this.handshake()}
          </div>
        </Switch>
      </React.Fragment>
    );
  };
};

export default App;
