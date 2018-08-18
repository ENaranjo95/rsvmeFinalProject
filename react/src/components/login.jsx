import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirectTo: null
        }
    }

    handleChange = (event) => {
      let target = event.target
      let value = event.target.value
      let name = target.name
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      axios.post('http://localhost:7000/user/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        let {first, last, email, phone} = response.data
          if (response.status === 200) {
            // update App.js state
            this.props.updateUser({
                loggedIn: true,
                first: first,
                last: last,
                email: email,
                phone: phone
            })
            // update the state to redirect to home
            this.setState({
              redirectTo: '/reserve'
            })
          }
      }).catch(error => { })
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return (
                <div>
                    <h4>Login</h4>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="email">Email: </label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input" placeholder="email" type="email" name="email" value={this.state.email} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="password">Password: </label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input" placeholder="password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <button className="btn btn-primary col-1 col-mr-auto" onClick={this.handleSubmit} type="submit">Login</button>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm
