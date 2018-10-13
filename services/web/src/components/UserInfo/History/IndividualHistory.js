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
      <div>
        It's not working!!!
      </div>
      // <div>
      //   <td>1</td>
      //   <td>{item.start_time}</td>
      //   <td>{item.end_time}</td>
      //   <td>{item.type}</td>
      //   <td>{item.status}</td>
      //   <td>{item.street1}</td>
      //   <td>{item.street2}</td>
      //   <td>{item.state}</td>
      //   <td>{item.city}</td>
      // </div>
    );
  };
};

export default IndividualHistory;