import React, { Component } from 'react';

class Guests extends Component {
  render(){
    const guestSize = [2, 4, 6, 8]

    return (
      <select className={this.props.className} name={this.props.name}>
        <option value="null"># of Guests</option>
        { guestSize.map((size) => (
          <option key={size} value={size}>
            {`${size} or Under`}
          </option>
        ))}
      </select>

    )
  }
}

export default Guests;
