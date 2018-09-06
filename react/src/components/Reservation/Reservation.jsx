import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

// Components
import TablesA from '../Tables/TablesA';
import TablesB from '../Tables/TablesB';
import TablesC from '../Tables/TablesC';
import TablesD from '../Tables/TablesD';
import Other from '../Tables/Other';
import Form from '../Form/Form';
import FormSubmitted from '../Form/FormSubmit';
import './Reservation.css';


class Reservation extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      timeSlots: [],
      available: [],
      reserved: [],
      table: null,
      guests: null,
      redirectTo: '/',
      rsvpForm: null,
      confirmation: null
    }
  }
  componentDidMount = () => {
    this.timeSlots();
    this.reserved();
  }
  reserved = () =>{
    axios.get('/api/reserved')
    .then( response => {
      console.log(response.data)
      this.setState({ reserved: response.data });
    })
    .catch(function (err) {
    });
  }

  timeSlots = () => {
    let counter =  moment().startOf("day").hour(11)
    let end =  moment().startOf("day").hour(22)

    const timeSlots = []

    while( counter.isSameOrBefore(end)){
      timeSlots.push( counter.clone() )
      counter.add( 1, 'hour')
    }
    this.setState({
      timeSlots: timeSlots
    })
  }

  filterTime = (rsvpTable) => {

    let available = this.state.timeSlots.filter( slot => {
    let time = slot.format('hh:mm a')
      return !rsvpTable.includes( time );
    });
    console.log(available)
    this.setState({
      available: available
    }, this.openForm())
  }

  rsvp = (table) =>{
    let reserved = this.state.reserved
    let rsvpTable = reserved.filter( slot => reserved.table === table.id)
    this.filterTime(rsvpTable)
    this.setState({
      table: table.id,
      guests: table.size
    })
  }

  openForm = () => {
    this.setState({
      rsvpForm: true
    })
  }

  closeForm = () => {
    this.setState({
      rsvpForm: false
    })
  }

  confirmation = () => {
    this.setState({
      rsvpForm: false,
      confirmation: true
    })
  }

  closeConfirmation = () => {
    this.setState({
      confirmation: false
    })
  }

  render(){
    if(this.props.loggedIn === false){
      return <Redirect to={{ pathname: this.state.redirectTo}} />
    } else {
      return (
        <div>
          <section id="displayTable" className="clearfix">

            <TablesA rsvp={this.rsvp} reserved={this.state.reserved} />

            <TablesB rsvp={this.rsvp} reserved={this.state.reserved} />

            <TablesC rsvp={this.rsvp} reserved={this.state.reserved} />

            <TablesD rsvp={this.rsvp} reserved={this.state.reserved} />

            <section className="space">
              <section className="column">
                <div className="checkIn">Check In</div>
              </section>
              <section className="column">
                <div className="bar">Bar</div>
              </section>
            </section>

          </section>
          {this.state.rsvpForm &&
          <Form available={this.state.available} userInfo={this.props.userInfo} confirmation={this.confirmation}
            table={this.state.table} guests={this.state.guests} onClick={this.closeForm} /> }

          {this.state.confirmation &&
            <FormSubmitted onClick={this.closeConfirmation}/>

          }
        </div>
      );
    }
  }
}

export default Reservation;
