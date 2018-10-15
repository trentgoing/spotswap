import React, { Component } from 'react';

class IndividualHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    const { item } = this.props; 
    const green = {backgroundColor: '#b8f2b9'};
    const blue = {backgroundColor: '#92bcef'}
    return (
      <tr style={item.type === 1 ? blue : green}>
        <td>{item.spot.start_time}</td>
        <td>{item.spot.end_time}</td>
        <td>{item.type}</td>
        <td>{item.status}</td>
        <td>{item.spot.street1}</td>
        <td>{item.spot.street2}</td>
        <td>{item.spot.state}</td>
        <td>{item.spot.city}</td>
      </tr>
    );
  };
};

export default IndividualHistory;