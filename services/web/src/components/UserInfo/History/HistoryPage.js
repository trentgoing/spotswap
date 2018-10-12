import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { withRouter } from 'react-router';
import { Button, Modal, Form, InputGroup, FormControl, Table } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';
import { getHistoryListings } from '../../../queries/queriesHistory';
import IndividualHistory from './IndividualHistory';

class HistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div>
        <Query query={getHistoryListings}>
          {({ loading, error, data }) => {
            if (loading) return <div>Fetching</div>;
            if (error) {
              return (
                <div> 
                  Error 
                  {console.log({error})}
                </div>
              )
            }
            if (data) { 
              return (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Street1</th>
                      <th>Street2</th>
                      <th>State</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.myListingsHistory.map(item => {
                      return (
                        <tr key={item.id}>
                          <IndividualHistory item={item}/>
                        </tr>
                      )
                    })}
                    <IndividualHistory />
                  </tbody>
                </Table>
              )
            };
          }}
        </Query>
      </div>
    );
  };
};

export default withRouter(HistoryPage);