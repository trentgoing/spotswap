import React, { Component } from 'react';
import './App.css';
import MapComp from '../Map/Map';

import HandshakeLister from '../Transaction/HandshakeLister';
import { AUTH_TOKEN } from '../../constants';

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
  }

  render() {
   
    return (
        <div className="App">
          <MapComp />
          <br></br><br></br>
          {this.handshake()}
        </div>
    );
  };
};

export default App;
