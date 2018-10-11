import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../../../constants';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  
  componentDidMount() {
    this.props.changeLogin();
  };

  render() {
    if (this.props.loggedIn) {
      return (
        <Container>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand><img src="/favicon-256.png" width="30" height="30" alt=""/></Navbar.Brand>
            <div id='searchInput' className='geocoder'></div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Nav>
              <NavDropdown title="menu" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/profilePage">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/historyPage">History</Link>
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    this.props.history.push(`/`);
                    this.props.toggleLogin();
                  }}
                >Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar>
        </Container>
      );
    }
    else {
      return (
        <Container>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand><img src="/favicon-256.png" width="30" height="30" alt=""/></Navbar.Brand>
            <div id="searchInput" className="geocoder"></div>
            <Nav>
              <NavDropdown title="menu" id="collasible-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/login">Login</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar>
        </Container>
      );
    }
  };
};

export default withRouter(NavBar);