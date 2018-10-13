import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { AUTH_TOKEN } from '../../../constants';
import { Container, Navbar, Nav, NavDropdown, FormControl, Form } from 'react-bootstrap';

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
            <div id="geocoder" className="geocoder"></div>
            <Nav className="mr-auto">
              <Nav.Link href="/profilePage">Profile</Nav.Link>
              <Nav.Link href="/historyPage">History</Nav.Link>
              <Nav.Link onClick={() => {
                    localStorage.removeItem(AUTH_TOKEN);
                    this.props.history.push(`/`);
                    this.props.toggleLogin();
                  }}
              >Logout</Nav.Link>

              {/* <NavDropdown title="menu" id="collasible-nav-dropdown"> 
                <NavDropdown.Item componentClass={Link} href="/profilePage" to="/profilePage" active={
                  this.props.location.pathname === "/profilePage"}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item componentClass={Link} href="/historyPage" to="/historyPage" active={
                  this.props.location.pathname === "/historyPage"}>
                  History
               </NavDropdown.Item>
                <NavDropdown.Item
                   onClick={() => {
                   localStorage.removeItem(AUTH_TOKEN);
                    this.props.history.push(`/`);
                    this.props.toggleLogin();
                  }}
                >Logout</NavDropdown.Item>
              </NavDropdown> */}
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
            <div id="geocoder" className="geocoder"></div>
            <Nav className="mr-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              {/* <NavDropdown title="menu" id="collasible-nav-dropdown">
                <NavDropdown.Item componentClass={Link} href="/login" to="/login" active={
                  this.props.location.pathname === "/login"}>
                  Login
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar>
        </Container>
      );
    }
  };
};

export default withRouter(NavBar);