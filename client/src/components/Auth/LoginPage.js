import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { submitLogin } from '../../actions/auth.action';

class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = {
			email: '',
			password: '',
			redirectToReferrer: false
		};
	}

	handleSubmit(event) {
		event.preventDefault();
		const { email, password } = this.state;
		this.props.login(email, password);
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

		if (redirectToReferrer) {
			return <Redirect to={from} />;
		}

		return (
			<div className="container">
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

function mapDispatchToProps(dispatch) {
	return {
		login: (email, password) => dispatch(submitLogin(email, password))
	};
}

function mapStateToProps(state) {
	const {
		payload,
		redirectToReferrer,
		isLoading,
		hasErrors
	} = state.authentication;
	return { payload, redirectToReferrer, isLoading, hasErrors };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
