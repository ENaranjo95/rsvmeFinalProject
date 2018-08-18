import React, { Component } from 'react';
// import moment from 'moment';

class Time extends Component {

  render(){
    const first = {
      value: 'false',
      name: 'Choose Time'
    }
    return (
      <select name={this.props.name} onChange={this.props.onChange} className={this.props.className}>
        <option value={first.value}> {first.name} </option>
         { this.props.timeSlots.map((hour) => {
             let formatted = hour.format('hh:mm a')
             return <option value={formatted} key={formatted}>
               {formatted}
             </option>
            })
          }
      </select>
    );
  }
}

export default Time;
