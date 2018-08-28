import React, { Component } from 'react';
import axios from 'axios';
import './Form.css';

//Component
import Time from '../Options/Time'

class Form extends Component {
  constructor(props){
    super(props);
    let { loggedIn, first, last, email, phone } = props.userInfo
    this.state = {
      available: props.time,
      loggedIn: loggedIn,
      first: first,
      last: last,
      email: email,
      phone: phone,
      time: '',
      table: props.table,
      guests: props.guests,
      other: '',
      show: props.show
    }
  }

  handleTimeSelect = ({target: {value}}) => {
    this.setState({
      time: value
    })
  }

  handleRequestChange = ({target: {value}}) => {
    this.setState({
      other: value
    })
  }

  handleSubmit = (event) => {
    // const error = new Error('Form was not submitted')
    event.preventDefault()
    axios.post('http://localhost:8080/api/reserve', {
      first: this.state.first,
      last: this.state.last,
      email: this.state.email,
      phone: this.state.phone,
      guests: this.state.guests,
      time: this.state.time,
      table: this.state.table,
      other: this.state.other
    })
    .then( (response) => {
      // response === 200 ? this.formSubmitted() : throw error
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });

  }



  render(){
    return (
      <div>
        <section className="displayForm main">
          <h2>Confirm Reservation</h2>

            <input id="first" placeholder="First Name" name="first" defaultValue={this.state.first} />

            <input id="last" placeholder="Last Name" name="last" defaultValue={this.state.last} />

            <input id="mail" type="email" placeholder="Email" name="email" defaultValue={this.state.email} />

            <input id="number" type="tel" placeholder="(888)-888-8888" name="phone" defaultValue={this.state.phone} />

            <input className="selector" name="guests"  defaultValue={this.state.guests} />

            <input className="selector" id="table" name="table" defaultValue={this.state.table} />

          <form onSubmit={this.handleSubmit}>

            <Time className="selector" id="time" name="time" value={this.state.time} onChange={this.handleTimeSelect} time={this.state.available}/>

            <input type="text" name="special" id="requests" defaultValue={this.state.value} onChange={this.handleRequestChange} />

            <input id="btn" type="submit" defaultValue="Submit" onSubmit={this.handleSubmit} />

          </form>
        </section>
      </div>
    )
  }
}

export default Form;
