import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// components
import Signup from './components/signup.jsx';
import Login from './components/login.jsx';
import Navbar from './components/navbar.jsx';
import Home from './components/home.jsx';
import Reservation from './components/Reservation/Reservation.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      first: null,
      last: null,
      email: null,
      phone: null
    }
  }

  updateUser = (userObject) => {
    this.setState(userObject)
  }

  componentWillUnmount = () => {
    this.setState({
      loggedIn: false,
      first: null,
      last: null,
      email: null,
      phone: null
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Route exact path="/" component={Home} />
        <Route path="/login" render={ () => <Login updateUser={this.updateUser} />} />
        <Route path="/signup" render={ () => <Signup updateUser={this.updateUser} />} />
        <Route path="/reserve" render={ () => <Reservation loggedIn={this.state.loggedIn}  userInfo={this.state} />} />
      </div>
    );
  }
}

export default App;
