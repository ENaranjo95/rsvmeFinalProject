import React, { Component } from 'react';
import moment from 'moment';

class Time extends Component {
  constructor(props){
    super(props);

    this.state = {
      timeSlots: []
    }
  }

  componentDidMount(){
    let counter =   moment().startOf("day").hour(11)
    let end =   moment().startOf("day").hour(22)

    let timeSlots = []
    while( counter.isSameOrBefore(end)){
      timeSlots.push( counter.clone() )
      counter.add( 1, 'hour')
    }
    this.setState({
      timeSlots: timeSlots
    })
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    let reservedArr = nextProps.reserved.map( doc => Number( doc.time ) );
    console.log(reservedArr)
    let available = this.state.timeSlots.filter( slot => {
      let timeStamp = slot.valueOf();
      return !reservedArr.includes( timeStamp );
    });
    this.setState({ timeSlots: available })
  }


  render(){
    return (
      <select name={this.props.name} onChange={this.props.onChange} className={this.props.className}>
         { this.state.timeSlots.map((hour) => {
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
