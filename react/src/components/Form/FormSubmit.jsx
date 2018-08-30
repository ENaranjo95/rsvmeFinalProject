import React, { Component } from 'react';
import './Form.css';

class FormSubmit extends Component {

  render(){
    console.log('mounted')
    return (
      <div>
        <section className="displayForm main">
          <button onClick={()=> {this.props.onClick()}}>X</button>
          <h3>Your Reservation is set. Look for an email confirmation and/or text message from RSVME.</h3>
        </section>
      </div>
    )
  }
}

export default FormSubmit;
