import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getSpotsQuery, editSpotMutation } from '../../queries/queriesSpot';
import moment from 'moment';

class ClaimSpot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
    this.claimSpot = this.claimSpot.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  };

  componentDidMount(){
    this.setState({
      id: this.props.id
    })
  };

  claimSpot(event) {
    event.preventDefault();
    this.props.editSpotMutation({
      variables: {
        id: this.state.id
      },
      refetchQueries: [{query: getSpotsQuery, variables: {}}]
    })
    .then(() => {
      console.log('Spot claimed');
    })
    .catch((err) => {
      console.log(err);
    })
  };

  render() {
    return (
      <div>
        <button onClick={this.claimSpot}>Claim</button>
      </div>
    );
  };
};

export default compose(
  graphql(editSpotMutation, {name: "editSpotMutation"})
)(ClaimSpot);