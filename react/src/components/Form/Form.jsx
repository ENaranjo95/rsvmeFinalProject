import React, { Component } from 'react';
import './Form.css';
import Option from '../Options/Option.jsx';
import Time from '../Options/Time.jsx';

class Form extends Component{
  state = {
    first: '',
    last: '',
    email: '',
    phone: '',
    time: '',
    table: ''
  }


  render(){
    return(
      <section className="reserve">
        <h2>Reserve Table</h2>
        <form>
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

          <Time className="selector" id="time" name="time" value={this.state.time} onChange={this.handleChange} available={this.state.available} />

          <input id="btn" type="submit" value="Submit" onChange={this.handleSubmit} />

        </form>
      </section>

    )
  }
}

export default Form;
