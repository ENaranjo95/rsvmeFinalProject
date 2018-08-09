import React, { Component } from 'react';
import moment from 'moment';

class Time extends Component {

  render(){
    return (
      <select name={this.props.name} onChange={this.props.onChange} className={this.props.className}>
        <option selected="true" disabled="disabled">Choose Time</option>    
         { this.props.available.map((hour) => {
             let formatted = hour.format('hh:mm a')
             let timeStamp = hour.valueOf()
             return <option value={timeStamp} key={timeStamp}>
               {formatted}
             </option>
            })
          }
      </select>
    );
  }
}

export default Time;
