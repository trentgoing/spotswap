import React, { Component } from 'react';
import './NavBar.css';
import { graphql, compose } from 'react-apollo';
import { getCurrentSearch, updateSearch } from '../../queries/queriesClient';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.displayLogin = this.displayLogin.bind(this);
  }

  componentDidMount() {

  }

  displayLogin() {
    if (this.props.user_id) {
      return (
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      );
    } else {
      return (
        <button className="btn btn-outline-secondary" type="submit">Sign In</button>
      );
    }
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-dark bg-dark navbar-expand-xs ">
          <a className="navbar-brand">
            <img src="/favicon-256.png" width="30" height="30" alt="" />
          </a>
          
          <div id='searchInput' className='geocoder'></div>
            
          {this.displayLogin()}
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

export default compose (
  graphql(updateSearch, {name: 'updateSearch'}),
  graphql(getCurrentSearch, {
    props: ({ data: { currentSearch, loading } }) => {
      return ({
        currentSearch,
        loading
      })
    }
  })
)(NavBar);
