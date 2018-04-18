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
			street: '',
			city: '',
			state: '',
			reference: '',
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
				const { userInfo } = body.data;

				this.setState({
					objectId: body.data._id,
					email: body.data.email,
					firstName: userInfo ? userInfo.firstName : '',
					lastName: userInfo ? userInfo.lastName : '',
					companyName: userInfo ? userInfo.company.companyName : '',
					department: userInfo ? userInfo.company.department : '',
					street: userInfo ? userInfo.address.street : '',
					state: userInfo ? userInfo.address.state : '',
					reference: userInfo ? userInfo.address.reference : '',
					city: userInfo ? userInfo.address.city : '',
					phone: userInfo ? userInfo.phone : ''
				});
			} else {
				throw Error(body.message);
			}
		} catch (err) {
			console.log(err);
		}
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
					street: this.state.street,
					city: this.state.city,
					state: this.state.state,
					reference: this.state.reference
				},
				phone: this.state.phone
			});

			if (response.data.status === 'error') {
				throw Error(response.data.message);
			}
		} catch (err) {
			console.log(err);
		}
	}

	async handleSubmit(event) {
		event.preventDefault();
		this.updateUserProfile();
	}

	render() {
		return (
			<div className="container">
				<form
					className="paper-card paper-form d-flex flex-column"
					onSubmit={this.handleSubmit}
				>
					<h1>Mi Perfil</h1>
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
							value={this.state.department}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="street">Calle</label>
						<input
							className="form-control"
							id="street"
							name="street"
							value={this.state.street}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="city">Sector</label>
						<input
							className="form-control"
							id="city"
							name="city"
							value={this.state.city}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="state">Estado | Provincia | Distrito</label>
						<input
							className="form-control"
							id="state"
							name="state"
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
							value={this.state.phone}
							onChange={this.handleInputChange}
						/>
					</div>

					<button className="btn btn-primary align-self-end">Guardar</button>
				</form>
			</div>
		);
	}
}
