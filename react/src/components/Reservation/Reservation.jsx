import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

// Components
import TablesA from '../Tables/TablesA.jsx';
import TablesB from '../Tables/TablesB.jsx';
import TablesC from '../Tables/TablesC.jsx';
import TablesD from '../Tables/TablesD.jsx';
import Time from '../Options/Time';
import Option from '../Options/Option';
import './Reservation.css';


class ReservationTable extends Component{
  constructor(props){
    super(props);

    this.state = {
      // tables is an array of objects, give an did, number of ids
      timeSlots: [],
      available: [],
      reserved: [],
      first: this.props.data.first,
      last: this.props.data.last,
      email: this.props.data.email,
      phone: this.props.data.phone,
      time: null,
      table: '',
      guests: '',
      redirectTo: '/'
    }
  }
  componentDidMount = () => {
    this.timeSlots()
    axios.get('http://localhost:8080/api/reserved')
    .then( response => {
      let rsvp = response.data.filter(item => item.checkIn === false );
      this.setState({ reserved: rsvp });
    })
    .catch(function (err) {
    });
  }

  // filterTime = (reserved) => {
  //   let reservedArr = reserved.map( doc => console.log(doc.time)  );
  //
  //   let available = this.state.timeSlots.filter( slot => {
  //     let time = slot.format('hh:mm a')
  //     return !reservedArr.includes( time );
  //   });
  //   this.setState({
  //     available: available
  //   })
  // }

  handleTimeChange = () => {
    let reservedState = this.state.reserved
    let table = this.state.table
    console.log(table)
    //let reservedTable = [];
     let reservedTable = reservedState.filter( doc => {
       console.log(doc.table)
       console.log(table)
       return doc.table === table;
     });
     console.log(reservedTable)
    //this.filterTime(reservedTable)
  }

  handleChange = (event) => {
    let target = event.target
    let value = event.target.value
    let name = target.name

    this.setState({
      [name]: value
    }, this.handleTimeChange() )
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // Will send the api request to post to db
    axios.post('http://localhost:8080/api/reserve', {
      first: this.state.first,
      last: this.state.last,
      email: this.state.email,
      phone: this.state.phone,
      guests: this.state.guests,
      time: this.state.time,
      table: this.state.table
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });

  }

  timeSlots = () => {
    let counter =  moment().startOf("day").hour(11)
    let end =  moment().startOf("day").hour(22)

    let timeSlots = []
    while( counter.isSameOrBefore(end)){
      timeSlots.push( counter.clone() )
      counter.add( 1, 'hour')
    }
    this.setState({
      timeSlots: timeSlots
    })
  }

  handleInputChange = ({target: {value}}) => {
    this.setState({
      guests: value
    })
  }

  render(){
    if(this.props.loggedIn === false){
      return <Redirect to={{ pathname: this.state.redirectTo}} />
    } else {
      return (
        <div>
          <section id="displayTable">

            <TablesA onClick={this.onClick} guests={this.state.guests} reserved={this.state.reserved} />

            <section className="high">
              <TablesB onClick={this.onClick} guests={this.state.guests} reserved={this.state.reserved} />
            </section>

            <section className="round">
              <TablesC onClick={this.onClick} guests={this.state.guests} reserved={this.state.reserved} />
            </section>
            <section className="walk">
              <section className="extra">
              <TablesD onClick={this.onClick} guests={this.state.guests} reserved={this.state.reserved} />
              </section>
              <div className="front">Check In</div>
            </section>
            <section className="bar">
              <section className="space"></section>
              <section className="column"><div>Bar</div></section>
            </section>
          </section>
          <section className="reserve">
            <h2>Reserve Table</h2>
            <form onSubmit={this.handleSubmit}>
              <legend>Customer Info</legend>

              <input id="first" placeholder="First Name" name="first" value={this.state.first} onChange={this.handleChange} />

              <input id="last" placeholder="Last Name" name="last" value={this.state.last} onChange={this.handleChange} />

              <input id="mail" type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />

              <input id="number" type="tel" placeholder="(888)-888-8888" name="phone" value={this.state.phone} onChange={this.handleChange} />

              <select className="selector" value={this.state.guests} onChange={this.handleInputChange} name="ppl">
                <option value="null"># of Guests</option>
                <option value="2">2</option>
                <option value="4">4 or under</option>
                <option value="6">6 or under</option>
                <option value="8">8 or under</option>
              </select>

              <Option className="selector" id="table" name="table" value={this.state.table} onChange={this.handleChange} guests={this.state.guests} />

              <Time className="selector" id="time" name="time" value={this.state.time} onChange={this.handleChange} available={this.state.available} timeSlots={this.state.timeSlots} />

              <input id="btn" type="submit" value="Submit" onSubmit={this.handleSubmit} />

            </form>
          </section>
        </div>
      );
    }
  }
}

export default ReservationTable;
