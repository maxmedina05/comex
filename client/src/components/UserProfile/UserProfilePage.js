import React, { Component } from 'react';
import axios from 'axios';

export default class UserProfilePage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.loadUserProfile = this.loadUserProfile.bind(this);
		this.updateUserProfile = this.updateUserProfile.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = {
			email: '',
			firstName: '',
			lastName: '',
			companyName: '',
			department: '',
			address: '',
			state: '',
			reference: '',
			city: '',
			phone: ''
		};
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		console.log(params);
		this.loadUserProfile(params.objectId);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	async loadUserProfile(objectId) {
		try {
			const response = await axios.get(`/api/v1/users/${objectId}`);
			const body = response.data;
			if (body.status === 'success') {
				this.setState({
					objectId: body.data._id,
					email: body.data.email,
					firstName: body.data.userInfo ? body.data.userInfo.firstName : '',
					lastName: body.data.userInfo ? body.data.userInfo.lastName : '',
					companyName: body.data.userInfo ? body.data.userInfo.companyName : '',
					department: body.data.userInfo ? body.data.userInfo.department : '',
					address: body.data.userInfo ? body.data.userInfo.address.address : '',
					state: body.data.userInfo ? body.data.userInfo.address.state : '',
					reference: body.data.userInfo
						? body.data.userInfo.address.reference
						: '',
					city: body.data.userInfo ? body.data.userInfo.address.city : '',
					phone: body.data.userInfo ? body.data.userInfo.phone : ''
				});
			} else {
				throw Error(body.message);
			}
		} catch (err) {
			console.log(err);
		}
	}

	async handleSubmit(event) {
		event.preventDefault();
		this.updateUserProfile();
	}

	async updateUserProfile() {
		try {
			const response = await axios.put(`/api/v1/users/${this.state.objectId}`, {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				companyInfo: {
					companyName: this.state.companyName,
					department: this.state.department
				},
				address: {
					address: this.state.address,
					state: this.state.state,
					reference: this.state.reference
				},
				phone: this.state.phone
			});

			if (response.data.status === 'error') {
				throw Error(response.data.message);
			}
			// this.props.history.goBack();
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<div className="container">
				<h1>Perfil de Usuario</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input
							className="form-control"
							id="email"
							name="email"
							value={this.state.email}
							readOnly
						/>
					</div>
					<div className="form-group">
						<label htmlFor="firstName">Nombre</label>
						<input
							className="form-control"
							id="firstName"
							name="firstName"
							placeholder="Jose"
							value={this.state.firstName}
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="lastName">Apellido</label>
						<input
							className="form-control"
							id="lastName"
							name="lastName"
							placeholder="Perez"
							value={this.state.lastName}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="companyName">Compañia</label>
						<input
							className="form-control"
							id="companyName"
							name="companyName"
							placeholder="Corporación ACME"
							value={this.state.companyName}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="department">Departamento</label>
						<input
							className="form-control"
							id="department"
							name="department"
							placeholder="Tecgnología"
							value={this.state.department}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="address">Dirección</label>
						<input
							className="form-control"
							id="address"
							name="address"
							placeholder="Calle Enriquillo"
							value={this.state.address}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="state">Estado | Provincia | Distrito</label>
						<input
							className="form-control"
							id="state"
							name="state"
							placeholder="Santo Domingo"
							value={this.state.state}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="reference">Referencia</label>
						<input
							className="form-control"
							id="reference"
							name="reference"
							placeholder="Proxímo a la autopista Las America"
							value={this.state.reference}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="phone">Teléfono</label>
						<input
							className="form-control"
							id="phone"
							name="phone"
							placeholder="(809) 555-5655"
							value={this.state.phone}
							onChange={this.handleInputChange}
						/>
					</div>

					<button className="btn btn-primary">Guardar</button>
				</form>
			</div>
		);
	}
}