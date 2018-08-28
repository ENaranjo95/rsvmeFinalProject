import React, { Component } from 'react';
import axios from 'axios';
import './Form.css';

//Component
import Time from '../Options/Time'

class Form extends Component {
  constructor(props){
    console.log('mounted')
    super(props);
    let { loggedIn, first, last, email, phone } = props.userInfo
    this.state = {
      available: props.time,
      loggedIn: loggedIn,
      first: first,
      last: last,
      email: email,
      phone: phone,
      formatNum: '',
      time: '',
      table: props.table,
      guests: props.guests,
      special: '',
      show: props.show
    }
  }
  componentDidMount = () =>{
    let number = this.state.phone
    let format = `${number.replace(/\D/g, '')}`
    let match = format.match(/^(\d{3})(\d{3})(\d{4})$/);
    this.setState({
      formatNum:`(${match[1]}) ${match[2]}-${match[3]}`
    })
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
    // event.preventDefault()
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
      // if(response === 200){
      //   this.props.formSubmitted()
      // }
      console.log(response)
    })
    .catch( (err) => {
      console.log(err)
    });
  }



  render(){
    return (
      <div>
        <section className="displayForm main">

          <section className="rsvpForm">
            <button onClick={()=>{this.props.onClick()} }>X</button>
            <h3>Please confirm your information</h3>
            <p>This reservation is set for {this.state.first} {this.state.last}</p>
            <section className="twin">
              <label htmlFor="email">Email:</label>
              <p id="email">{this.state.email}</p>
            </section>
            <section className="twin">
              <label htmlFor="phone">Mobile:</label>
              <p id="phone">{this.state.formatNum}</p>
              <p>By providng your mobile number, you agree to receive text messages from RSVME. RSVME will only text you about your reservation.</p>
            </section>
            <p>Your table is set for guest size of {this.state.guests} or under. Please be considerate of the fact that this table is for a party size of {this.state.guests} or {this.state.guests - 1}</p>
          </section>

          <form onSubmit={this.handleSubmit}>

            <h3>Confirm Reservation</h3>

            <Time className="selector" id="time" name="time" value={this.state.time} onChange={this.handleTimeSelect} time={this.state.available}/>

            <input type="text" name="special" id="requests" placeholder="Special Requests?" defaultValue={this.state.value} onChange={this.handleRequestChange} />

            <input id="btn" type="submit" defaultValue="Submit" onSubmit={this.handleSubmit} />

          </form>
        </section>
      </div>
    )
  }
}

export default Form;
