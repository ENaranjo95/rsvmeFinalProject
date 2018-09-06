import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
	constructor(props) {
		super(props)
		this.state = {
			first: null,
			last: null,
			email: null,
			phone: null,
			password: '',
			confirmPassword: null,
			redirectTo: null,
			error: null
		}
	}
	handleChange = ({target}) => {
		let value = target.value
		let name = target.name
		this.setState({
			[name]: value
		})
	}
	checkPassword = (event) => {
		event.preventDefault()
		if(this.state.password !== this.state.confirmPassword ){
			this.setState({ error: 'Passwords do not match!'})
		}else{
			this.handleSubmit()
		}
	}
	handleSubmit = () => {
		axios.post('/user/signup', {
			first: this.state.first,
			last: this.state.last,
			email: this.state.email,
			phone: this.state.phone,
			password: this.state.password
		})
		.then(response => {
			const {first, last, email, phone } = response.data
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
			}
		}).catch(error => {
			console.log(error)
		})
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
										<input className="form-input" type="tel" id="phone" name="phone" placeholder="(888) 888-8888" value={this.state.username} onChange={this.handleChange} />
								</div>
						</div>
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="password">Password: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input" placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
							</div>
						</div>
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="password">Confirm Password: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input" placeholder="Confirm password" type="password" name="confirmPassword" value={this.state.confirmPasswordpassword} onChange={this.handleChange} />
							</div>
						</div>
						<div className="form-group ">
							<div className="col-7"></div>
							<button className="btn btn-primary col-1 col-mr-auto" onClick={this.checkPassword} type="submit">Sign up</button>
						</div>
						{this.state.error}
					</form>
				</div>
			);
		}
	}
}

export default Signup
