import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	NavLink
} from 'reactstrap';

export default class LoginModal extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleRegisterClick = this.handleRegisterClick.bind(this);
		this.handleLoginClick = this.handleLoginClick.bind(this);

		this.state = {
			showModal: false,
			redirectToSignupPage: false,
			email: '',
			password: ''
		};
	}

	toggle() {
		this.setState({
			showModal: !this.state.showModal
		});
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	handleLoginClick() {
		const { email, password } = this.state;

		if (email.length > 0 && password.length > 0) {
			this.props.handleLogin(email, password);
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

	handleRegisterClick() {
		this.setState({
			showModal: false,
			redirectToSignupPage: true
		});
	}

	render() {
		const isUserRegistering = window.location.pathname === '/signup';

		if (this.state.redirectToSignupPage) {
			return <Redirect to="/signup" />;
		}

		return (
			<div>
				<NavLink style={{ cursor: 'pointer' }} onClick={this.toggle}>
					Iniciar Sessión
				</NavLink>
				<Modal
					isOpen={
						(!isUserRegistering && !this.props.isAuthenticated) ||
						this.state.showModal
					}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle}>Iniciar Sessión</ModalHeader>
					<ModalBody>
						<form>
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

							<div />
						</form>
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.handleRegisterClick}>
							Registrarse
						</Button>
						<Button color="primary" onClick={this.handleLoginClick}>
							Entrar
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
