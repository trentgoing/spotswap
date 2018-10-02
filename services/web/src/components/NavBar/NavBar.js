import React, { Component } from 'react';
import './NavBar.css';

import AddLocation from '../AddLocation/AddLocation';



class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
    console.log(this.props);
    return (
      <div className="container">
        <nav className="navbar navbar-dark bg-dark navbar-expand-xl ">
          <a className="navbar-brand">
            <img src="/favicon-256.png" width="30" height="30" alt="" />
          </a>
          
          <span class="navbar-text">
            Sign In
          </span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Pricing</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default NavBar;
