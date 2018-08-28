import React, { Component } from 'react';
import axios from 'axios';
import './Form.css';

class Form extends Component {
  constructor(props){
    console.log('Mounted')
    super(props);
    let { loggedIn, first, last, email, phone } = props.userInfo
    this.state = {
      loggedIn: loggedIn,
      first: first,
      last: last,
      email: email,
      phone: phone,
      time: [],
      table: props.table,
      guests: props.guests,
      show: props.show
    }
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
      table: this.state.table
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
        <section className={`${this.props.show === true ? 'displayForm': 'reserve'} main`}>
          <h2>Reserve Table</h2>
          <form onSubmit={this.handleSubmit}>
            <legend>Customer Info</legend>

            <input id="first" placeholder="First Name" name="first" defaultValue={this.state.first} />

            <input id="last" placeholder="Last Name" name="last" defaultValue={this.state.last} />

            <input id="mail" type="email" placeholder="Email" name="email" defaultValue={this.state.email} />

            <input id="number" type="tel" placeholder="(888)-888-8888" name="phone" defaultValue={this.state.phone} />

            <input className="selector" name="guests"  defaultValue={this.state.guests} />

            <input className="selector" id="table" name="table" defaultValue={this.state.table} />

            <input id="btn" type="submit" defaultValue="Submit" onSubmit={this.handleSubmit} />

          </form>
        </section>
      </div>
    )
  }
}

export default Form;
