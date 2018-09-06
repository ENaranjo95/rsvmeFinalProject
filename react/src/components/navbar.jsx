import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: this.props.loggedIn,
        redirectTo: null
      }
    }

    logout = (event) => {
        event.preventDefault()
        axios.post('http://localhost:7000/user/logout')
        .then(response => {
          if (response.status === 200) {
            this.setState({
              redirectTo: null
            })
            this.props.updateUser({
              loggedIn: false,
              first: null,
              last: null,
              email: null,
              phone: null
            })
          }
        }).catch(error => { console.log(error)
        })
      }

  render() {
    const loggedIn = this.props.loggedIn;
    if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {

    return (
        <div>
          <header className="App-header" id="nav-container">
            <div className="" >
              {loggedIn ? (
                <div className="title">
                  <div className="filler"></div>
                  <h1 className="Apptitle">RSVME</h1>
                  <section className="navbarLogout">
                    <Link to="#" className="btn btn-link " onClick={this.logout}>
                      <span className="links">Logout</span>
                    </Link>
                  </section>
                </div>
                ) : (
                <div className="title">
                  <div className="filler"></div>
                  <h1 className="Apptitle">RSVME</h1>
                  <section className="navbar">
                    <Link to="/" className="btn btn-link">
                      <span className="links">Home</span>
                    </Link>
                    <Link to="/login" className="btn btn-link">
                      <span className="links">Login</span>
                    </Link>
                    <Link to="/signup" className="btn btn-link">
                      <span className="links">Sign up</span>
                    </Link>
                  </section>
                </div>
                  )}
            </div>
          </header>
        </div>

      );
    }
  }
}

export default Navbar
