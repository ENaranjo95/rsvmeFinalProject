import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import TablesA from '../Tables/TablesA.jsx';
import TablesB from '../Tables/TablesB.jsx';
import TablesC from '../Tables/TablesC.jsx';
import TablesD from '../Tables/TablesD.jsx';
import Option from '../Options/Option.jsx';
import Time from '../Options/Time.jsx';
import './Reservation.css';


class ReservationTable extends Component{
  constructor(props){
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this)

    this.state = {
      // tables is an array of objects, give an did, number of ids
      reserved: [],
      guests: '',
      first: '',
      last: '',
      email: '',
      phone: '',
      time: '',
      table: '',
      redirectTo: '/'
    }
  }
  componentDidMount(){
    axios.get('http://localhost:8080/api/reserved')
    .then( response => {
      let data = response.data;
      let reserved = data.filter(item => item.checkIn === false );

      this.setState({ reserved: reserved });

      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

    console.log(this.state.reserved)
  }

  handleChange(event){
    let target = event.target
    let value = event.target.value
    let name = target.name
    console.log(target)
    console.log(name)
    console.log(value)

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
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
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  onClick(event){
    console.log(event)
    console.log('listening')
    this.setState({
      test: 'red'
    });
  }

  handleInputChange(event){
    this.setState({guests: event.target.value})
    console.log(this.state.reserved)
  }

  render(){
    if(this.props.loggedIn === false){
      return <Redirect to={{ pathname: this.state.redirectTo}} />
    } else {
      return (
        <div>
          <section id="displayTable">
            <section className="booth">
              <section className="seat"></section>
              <TablesA size={6} onClick={this.onClick} guests={this.state.guests} test={this.state.test} reserved={this.state.reserved} />
            </section>
            <section className="high">
              <TablesB size={4} onClick={this.onClick} guests={this.state.guests} test={this.state.test} reserved={this.state.reserved} />
            </section>
            <section className="round">
              <TablesC size={8} onClick={this.onClick} guests={this.state.guests} test={this.state.test} reserved={this.state.reserved} />
            </section>
            <section className="walk">
              <section className="extra">
              <TablesD size={2} onClick={this.onClick} guests={this.state.guests} test={this.state.test} reserved={this.state.reserved} />
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
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>

              <Time className="selector" id="time" name="time" value={this.state.time} onChange={this.handleChange} reserved={this.state.reserved} table={this.state.table} />

              <Option className="selector" id="table" name="table" value={this.state.table} onChange={this.handleChange} guests={this.state.guests} />

              <input id="btn" type="submit" value="Submit" onChange={this.handleSubmit} />
              
            </form>
          </section>
        </div>
      );
    }
  }
}

export default ReservationTable;