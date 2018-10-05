import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './NavBar.css';
import { graphql, compose } from 'react-apollo';
import { getCurrentSearch, updateSearch } from '../../queries/queriesClient';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../../constants';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.displayLogin = this.displayLogin.bind(this);
  };

  componentDidMount() {
  };

  displayLogin() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      return (
        <div
          className="navbar-toggler"
          onClick={() => {
            localStorage.removeItem(AUTH_TOKEN)
            this.props.history.push(`/`)
          }}
        >
          Logout
        </div>
      );
    } else {
      return (
        <Link to="/login" className="btn btn-outline-secondary">Login</Link>
      );
    }
  };

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
};

// export default compose (
//   graphql(updateSearch, {name: 'updateSearch'}),
//   graphql(getCurrentSearch, {
//     props: ({ data: { currentSearch, loading } }) => {
//       return ({
//         currentSearch,
//         loading
//       })
//     }
//   })
// )(NavBar);

export default withRouter(NavBar);