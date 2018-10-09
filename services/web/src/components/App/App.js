import React, { Component } from 'react';
import './App.css';
import MapComp from '../Map/Map';
import Header from '../Header/Header';
import HandshakeLister from '../Transaction/HandshakeLister';
import { AUTH_TOKEN } from '../../constants';

class App extends Component {

  handshake() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if(authToken){
      console.log('logged in')
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
          <Header />
          <MapComp />
          <br></br><br></br>
          {this.handshake()}
        </div>
    );
  };
};

export default App;
