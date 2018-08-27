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
      loggedIn: this.props.loggedIn,
      timeSlots: [],
      available: [],
      reserved: [],
      time: null,
      table: null,
      guests: null,
      redirectTo: '/',
      show: false
    }
  }
  componentDidMount = () => {
    window.addEventListener('keyup', this.handleKeyUp, false);
    document.addEventListener('click', this.handleOutsideClick, false);
    this.timeSlots();
    this.reserved();
  }

  componentWillUnmount = () => {
    window.removeEventListener('keyup', this.handleKeyUp, false);
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleKeyUp = (event) => {
    const { onCloseRequest } = this.props;
    const keys = {
      27: () => {
      event.preventDefault();
      onCloseRequest();
      window.removeEventListener('keyup', this.handleKeyUp, false);
    },
    };
  }
  reserved = () =>{
    axios.get('http://localhost:8080/api/reserved')
    .then( response => {
      let rsvp = response.data.filter(item => item.checkIn === false );
      this.setState({ reserved: rsvp });
    })
    .catch(function (err) {
    });
    console.log(this.state.reserved)
    this.handleTimeChange()
  }

  handleTimeChange = () => {
    console.log('running')
    console.log(this.state)
    let reservedState = this.state.reserved
    let table = this.state.table
    console.log(table)
    //let reservedTable = [];
     let reservedTable = reservedState.filter( doc => {
       console.log(doc.table)
       console.log(table)
       return doc.table === table;
     });
    //this.filterTime(reservedTable)
  }

  handleChange = ({target}) => {
    let value = target.value
    let name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
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
    .then( (response) => {
      // response === 200 ? this.formSubmitted() : console.log(response)
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    });

  }

  timeSlots = () => {
    let counter =  moment().startOf("day").hour(11)
    let end =  moment().startOf("day").hour(22)

    let timeSlots = []

    while( counter.isSameOrBefore(end)){
      timeSlots.push( counter.clone() )
      counter.add( 1, 'hour')
    }
    this.setState({
      timeSlots: timeSlots
    })
  }

  handleGuestChange = ({target: {value}}) => {
    this.setState({
      guests: value
    })
  }

  filterTime = (reserved) => {
    let reservedArr = reserved.map( doc => console.log(doc.time)  );

    let available = this.state.timeSlots.filter( slot => {
      let time = slot.format('hh:mm a')
      return !reservedArr.includes( time );
    });
    this.setState({
      available: available
    })
  }

  showForm = (table) =>{
    this.setState({
      table: table.id,
      guests: table.size
    })
    this.modal()
  }

  modal = () => {
    this.setState({
      show: true
    })
  }


  render(){
    if(this.props.loggedIn === false){
      return <Redirect to={{ pathname: this.state.redirectTo}} />
    } else {
      return (
        <div>
          <section id="displayTable" className="clearfix">

            <TablesA form={this.showForm} guests={this.state.guests} reserved={this.state.reserved} />

            <TablesB form={this.showForm} guests={this.state.guests} reserved={this.state.reserved} />

            <TablesC form={this.showForm} guests={this.state.guests} reserved={this.state.reserved} />

            <TablesD form={this.showForm} guests={this.state.guests} reserved={this.state.reserved} />

            <Other />

          </section>
            <Form show={this.state.show} time={this.state.timeSlots} userInfo={this.props.userInfo} table={this.state.table} guests={this.state.guests}/>
        </div>
      );
    }
  }
}

export default Reservation;
