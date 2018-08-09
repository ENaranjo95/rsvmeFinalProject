import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
// components
import Signup from './components/signup.jsx';
import Login from './components/login.jsx';
import Navbar from './components/navbar.jsx';
import Home from './components/home.jsx';
import Reservation from './components/Reservation/Reservation.jsx';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('http://localhost:7000/user/').then(response => {
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Route exact path="/" component={Home} />
        <Route path="/login" render={() => <Login updateUser={this.updateUser} />} />
        <Route path="/signup" render={() => <Signup updateUser={this.updateUser} />} />
        <Route path="/reserve" render={() => <Reservation loggedIn={this.state.loggedIn} />} />
      </div>
    );
  }
}

export default App;
