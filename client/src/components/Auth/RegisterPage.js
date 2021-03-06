import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { submitRegister } from '../../actions/auth.action';

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			repeatPassword: ''
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		const { firstName, lastName, email, password, repeatPassword } = this.state;

		if (password !== repeatPassword) {
			console.error('La Contraseña no coincide');
		} else {
			const registrationForm = {
				firstName,
				lastName,
				email,
				password,
				repeatPassword
			};

			this.props.register(registrationForm);
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
		const { redirectToReferrer } = this.props;

		if (redirectToReferrer === true) {
			return <Redirect to={from} />;
		}

		return (
			<div className="container">
				<div className="paper-card register-form">
					<form
						className="d-flex flex-column paper-form"
						onSubmit={this.handleSubmit}
					>
						<h2>Registro</h2>
						<div className="form-group">
							<div className="row">
								<div className="col">
									<label htmlFor="firstName">Nombre</label>
									<input
										required
										className="form-control"
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
										name="lastName"
										placeholder="Perez"
										value={this.state.lastName}
										onChange={this.handleInputChange}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								required
								className="form-control"
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
						<div className="error-message">{this.props.error}</div>
						<button className="btn btn-primary align-self-end">
							Registrar
						</button>
					</form>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		register: form => dispatch(submitRegister(form))
	};
}

function mapStateToProps(state) {
	const {
		payload,
		redirectToReferrer,
		isLoading,
		error
	} = state.authentication;
	return { payload, redirectToReferrer, isLoading, error };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
