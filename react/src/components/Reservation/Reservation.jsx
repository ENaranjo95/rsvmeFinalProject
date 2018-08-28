import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

// Components
import TablesA from '../Tables/TablesA';
import TablesB from '../Tables/TablesB';
import TablesC from '../Tables/TablesC';
import TablesD from '../Tables/TablesD';
import Other from '../Tables/Other'
import Form from '../Form/Form';
import './Reservation.css';


class Reservation extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: props.loggedIn,
      timeSlots: [],
      available: [],
      reserved: [],
      time: null,
      table: null,
      guests: null,
      redirectTo: '/',
      show: null
    }
  }
  componentDidMount = () => {
    this.timeSlots();
    this.reserved();
  }
  reserved = () =>{
    axios.get('http://localhost:8080/api/reserved')
    .then( response => {
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
    })
    this.modal()
  }

  openForm = (table) =>{
    let reserved = this.state.reserved
    let rsvpTable = reserved.filter( slot => reserved.table === table.id)
    this.filterTime(rsvpTable)
    this.setState({
      table: table.id,
      guests: table.size
    })
  }

  modal = () => {
    this.setState({
      show: true
    })
  }

  closeForm = () => {
    this.setState({
      show: false
    })
  }


  render(){
    if(this.props.loggedIn === false){
      return <Redirect to={{ pathname: this.state.redirectTo}} />
    } else {
      return (
        <div>
          <section id="displayTable" className="clearfix">

            <TablesA form={this.openForm} reserved={this.state.reserved} />

            <TablesB form={this.openForm} reserved={this.state.reserved} />

            <TablesC form={this.openForm} reserved={this.state.reserved} />

            <TablesD form={this.openForm} reserved={this.state.reserved} />

            <Other />

          </section>
          {this.state.show &&
          <Form time={this.state.available} userInfo={this.props.userInfo}
            table={this.state.table} guests={this.state.guests}/> }
        </div>
      );
    }
  }
}

export default Reservation;
