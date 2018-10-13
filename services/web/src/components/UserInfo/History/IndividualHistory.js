import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';


class IndividualHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let { item } = this.props; 
    return (
      // <div>
      //   It's not working!!!
      // </div>
      <div>
        <td>1</td>
        <td>{item.spot.start_time}</td>
        <td>{item.spot.end_time}</td>
        <td>{item.type}</td>
        <td>{item.status}</td>
        <td>{item.spot.street1}</td>
        <td>{item.spot.street2}</td>
        <td>{item.spot.state}</td>
        <td>{item.spot.city}</td>
      </div>
    );
  };
};

export default IndividualHistory;