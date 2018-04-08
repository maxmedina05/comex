import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.login = this.login.bind(this);

		this.state = {
			email: '',
			password: '',
			redirectToReferrer: false
		};
	}

	async login() {
		const { email, password } = this.state;

		try {
			const response = await axios.post('/api/v1/auth/login', {
				email,
				password
			});

			const body = response.data;

			if (body.status === 'success') {
				this.props.userHasAuthenticated({
					authenticated: true,
					role: body.data.role,
					objectId: body.data.objectId
				});
				this.setState({
					redirectToReferrer: true
				});
			} else {
				throw Error(body.message);
			}
		} catch (err) {
			console.log(err);
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		this.login();
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		const { redirectToReferrer } = this.state;

		if (redirectToReferrer) {
			if (redirectToReferrer) {
				return <Redirect to={from} />;
			}
		}

		return (
			<div>
				<h1>Iniciar Sessión</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							required
							className="form-control"
							id="email"
							name="email"
							type="email"
							placeholder="jose.perez@example.com"
							value={this.state.email}
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="password">Contraseña</label>
						<input
							className="form-control"
							id="password"
							name="password"
							type="password"
							value={this.state.password}
							onChange={this.handleInputChange}
						/>
					</div>

					<button className="btn btn-warning">Go back</button>
					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		);
	}
}
