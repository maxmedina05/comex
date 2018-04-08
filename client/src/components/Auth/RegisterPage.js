import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.signup = this.signup.bind(this);

		this.state = {
			email: '',
			password: '',
			repeatPassword: '',
			redirectToReferrer: false
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		this.signup();
	}

	async signup() {
		const { email, password, repeatPassword } = this.state;

		try {
			if (password === '' || email === '' || repeatPassword === '') {
				throw Error('Debes llenar todos los campos');
			}

			if (repeatPassword !== password) {
				throw Error('La Contraseña no coincide');
			}

			const response = await axios.post('/api/v1/users/signup', {
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
			console.log(err.message || err);
		}
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
			<div className="container">
				<h1>{this.state.isEditMode ? 'Editar Perfil' : 'Crear una cuenta'}</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="row">
						<div className="col">
							<label htmlFor="firstName">Nombre</label>
							<input
								required
								className="form-control"
								id="firstName"
								name="firstName"
								placeholder="Jose"
								value={this.state.firstName}
								onChange={this.handleInputChange}
							/>
						</div>
						<div className="col">
							<label htmlFor="lastName">Apellido</label>
							<input
								required
								className="form-control"
								id="lastName"
								name="lastName"
								placeholder="Jose Perez"
								value={this.state.lastName}
								onChange={this.handleInputChange}
							/>
						</div>
					</div>
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
					<div className="form-group">
						<label htmlFor="repeatPassword">Repita la Contraseña</label>
						<input
							className="form-control"
							id="repeatPassword"
							name="repeatPassword"
							type="password"
							value={this.state.repeatPassword}
							onChange={this.handleInputChange}
						/>
					</div>

					<button className="btn btn-primary">Iniciar</button>
				</form>
			</div>
		);
	}
}
