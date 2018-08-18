import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
	constructor(props) {
		super(props)
		this.state = {
			first: '',
			last: '',
			email: '',
			phone: '',
			password: '',
			confirmPassword: '',
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

		//request to server to add a new username/password
		axios.post('http://localhost:7000/user/signup', {
			first: this.state.first,
			last: this.state.last,
			email: this.state.email,
			phone: this.state.phone,
			password: this.state.password
		})
		.then(response => {
			let {first, last, email, phone } = response.data
			if (!response.data.errmsg) {
				this.props.updateUser({
						loggedIn: true,
						first: first,
						last: last,
						email: email,
						phone: phone
				})
				//redirect to login page
				this.setState({
					redirectTo: '/reserve'
				})
			} else {
			}
		}).catch(error => {})
	}


render() {
	if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
	} else {
			return (
				<div className="SignupForm">
					<h4>Sign up</h4>
					<form className="form-horizontal">
						<div className="form-group">
								<div className="col-1 col-ml-auto">
										<label className="form-label" htmlFor="first">First Name:</label>
								</div>
								<div className="col-3 col-mr-auto">
										<input className="form-input" type="text" id="first" name="first" placeholder="First Name" value={this.state.username} onChange={this.handleChange} />
								</div>
						</div>
						<div className="form-group">
								<div className="col-1 col-ml-auto">
										<label className="form-label" htmlFor="last">Last Name:</label>
								</div>
								<div className="col-3 col-mr-auto">
										<input className="form-input" type="text" id="last" name="last" placeholder="Last Name" value={this.state.username} onChange={this.handleChange} />
								</div>
						</div>
						<div className="form-group">
								<div className="col-1 col-ml-auto">
										<label className="form-label" htmlFor="email">Email:</label>
								</div>
								<div className="col-3 col-mr-auto">
										<input className="form-input" type="text" id="email" name="email" placeholder="Email" value={this.state.username} onChange={this.handleChange} />
								</div>
						</div>
						<div className="form-group">
								<div className="col-1 col-ml-auto">
										<label className="form-label" htmlFor="phone">Phone Number:</label>
								</div>
								<div className="col-3 col-mr-auto">
										<input className="form-input" type="text" id="phone" name="phone" placeholder="Phone Number" value={this.state.username} onChange={this.handleChange} />
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
							<button className="btn btn-primary col-1 col-mr-auto" onClick={this.handleSubmit} type="submit">Sign up</button>
						</div>
					</form>
				</div>
			);
		}
	}
}

export default Signup
