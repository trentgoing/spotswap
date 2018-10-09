import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { AUTH_TOKEN } from '../../constants';
import { Mutation } from 'react-apollo';
import { signupQuery, loginQuery } from '../../queries/queriesUser';
import { Button } from 'react-bootstrap/lib/Button';
import { Modal, Container, Row, Col } from 'react-bootstrap';

import './Login.css';

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: true, // swith between login and signup
      email: '',
      password: '',
      user_name: '',
      show: true
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(){
    this.setState({ show:false });
  }
  handleShow(){
    this.setState({show:true});
  }

  render() {
    const { login, email, password, user_name } = this.state
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{login ? 'Login' : 'Sign Up'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
            <Row className="show-grid">
              <Col xs={12} md={8}>
                <code>.col-xs-12 .col-md-8</code>
              </Col>
              <Col xs={6} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col>
            </Row>

            <Row className="show-grid">
              <Col xs={6} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col>
              <Col xs={6} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col>
              <Col xs={6} md={4}>
                <code>.col-xs-6 .col-md-4</code>
              </Col>
            </Row>
          </Container>
            <div className="Login">
            <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
            <div className="flex flex-column">
              {!login && (
                <input
                  value={user_name}
                  onChange={e => this.setState({ user_name: e.target.value })}
                  type="text"
                  placeholder="Your name"
                />
              )}
              <input
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                type="text"
                placeholder="Your email address"
              />
              <input
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Choose a safe password"
              />
            </div>
            <div className="flex mt3">
              <Mutation
                mutation={login ? loginQuery : signupQuery}
                variables={{ email, password, user_name }}
                onCompleted={data => this._confirm(data)}
              >
                {mutation => (
                  <div className="pointer mr2 button" onClick={mutation}>
                    {login ? 'login' : 'create account'}
                  </div>
                )}
              </Mutation>
              <div
                className="pointer button"
                onClick={() => this.setState({ login: !login })}
              >
                {login ? 'need to create an account?' : 'already have an account?'}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    this.props.history.push(`/`);
  };

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
};

export default withRouter(Login);
