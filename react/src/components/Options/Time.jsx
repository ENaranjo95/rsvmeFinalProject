import React, { Component } from 'react';
// import moment from 'moment';

class Time extends Component {

  render(){
    const time = this.props.time
    const first = {
      value: 'false',
      name: 'Choose Time'
    }
    return (
      <select name={this.props.name} onChange={this.props.onChange} className={this.props.className}>
        <option value={first.value}> {first.name} </option>
         { time.map((hour) => {
           let format = hour.format('hh:mm a')
             return <option value={format} key={format}>
               {format}
             </option>
            })
          }
      </select>
    );
  }
}

export default Time;
