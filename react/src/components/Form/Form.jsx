import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props){
    super(props);
    let { loggedIn, first, last, email, phone } = this.props.userInfo
    this.state = {
      loggedIn: loggedIn,
      first: first,
      last: last,
      email: email,
      phone: phone,
      time: [],
      table: this.props.table,
      guests: this.props.guests,
      show: this.props.show
    }
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
