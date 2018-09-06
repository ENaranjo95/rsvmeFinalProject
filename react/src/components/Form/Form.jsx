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
      available: props.available,
      loggedIn: loggedIn,
      first: first,
      last: last,
      email: email,
      phone: phone,
      formatNum: '',
      time: null,
      table: props.table,
      guests: props.guests,
      special: '',
      show: props.show,
      error: null
    }
  }
  componentDidMount = () =>{
    let number = this.state.phone
    let format = `${number.replace(/\D/g, '')}`
    let match = format.match(/^(\d{3})(\d{3})(\d{4})$/);
    this.setState({
      formatNum:`(${match[1]}) ${match[2]}-${match[3]}`
    })
    console.log(this.state.time)
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

  checkTimeSelect = (event) => {
    event.preventDefault()
    if(this.state.time){
      this.handleSubmit()
    }else{
      this.setState({
        error: 'Please select a time.'
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/api/reserve', {
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
      if(response.status === 200){
        this.props.confirmation()
      }
      console.log(response)
    })
    .catch( (err) => {
      console.log(err)
    });
  }



  render(){
    const style = {color: 'red', display: 'block'}
    return (
      <div>
        <section className="overlay">
          <section className="displayForm main">

            <section className="rsvpForm">
              <button id="close" onClick={ ()=>{this.props.onClick()} }>X</button>
              <h3>Please confirm your information</h3>
              <p>This reservation is set for {this.state.first} {this.state.last}</p>
              <section className="twin">
                <label htmlFor="email">Email:</label>
                <p id="email">{this.state.email}</p>
              </section>
              <section className="twin">
                <label htmlFor="phone">Mobile:</label>
                <p id="phone">{this.state.formatNum}</p>
              </section>
              <p className="smallText">By providng your mobile number, you agree to receive text messages from RSVME. RSVME will only text you about your reservation.</p>
              <p className="rsvpSize">Your table is set for guest size of {this.state.guests} or under. Please be considerate of the fact that this table is only for a party size of {this.state.guests} or {this.state.guests - 1}</p>
            </section>

            <form>

              <h3>Confirm Reservation</h3>

              <Time className="selector" id="time" name="time" value={this.state.time} onChange={this.handleTimeSelect} time={this.state.available}/>

              { this.state.error &&  <span style={style}>{this.state.error}</span> }

              <input type="text" name="special" id="requests" placeholder="Special Requests?" value={this.state.value} onChange={this.handleRequestChange} />

              <button id="btn" type="button" onClick={this.checkTimeSelect}>Submit</button>

            </form>
          </section>
        </section>
      </div>
    )
  }
}

export default Form;
