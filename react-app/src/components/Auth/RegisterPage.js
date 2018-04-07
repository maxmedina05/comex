import React, { Component } from 'react';
import axios from 'axios';

export default class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.loadResource = this.loadResource.bind(this);
		this.createNewResource = this.createNewResource.bind(this);
		this.updateResource = this.updateResource.bind(this);

		this.state = {
			objectId: '0',
			isEditMode: false,
			email: '',
			password: '',
			name: '',
			userInfo: {
				firstName: '',
				lastName: '',
				companyName: '',
				department: '',
				address: '',
				phone: ''
			}
		};
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		if (!this.isEmpty(params)) {
			this.setState({ isEditMode: true });
			this.loadResource(params.objectId);
		}
	}

	isEmpty(params) {
		return Object.keys(params).length === 0 && params.constructor === Object;
	}

	async loadResource(objectId) {
		try {
			const response = await axios.get(`/api/v1/menus/${objectId}`);
			const body = response.data;
			if (body.status === 'success') {
				this.setState({
					objectId: body.data._id,
					items: body.data.name,
					startTime: body.data.startTime,
					endTime: body.data.endTime,
					description: body.data.description,
					discount: body.data.discount
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

		if (this.state.isEditMode) {
			this.updateResource();
		} else {
			this.createNewResource();
		}
	}

	async createNewResource() {
		try {
			const response = await axios.post('/api/v1/menus', {
				description: this.state.description,
				discount: this.state.discount,
				startTime: this.state.startTime,
				endTime: this.state.endTime,
				items: this.state.items
			});

			if (response.data.status === 'error') {
				throw Error(response.data.message);
			}
			console.log(response.data.message);
		} catch (err) {
			console.log(err);
		}
	}

	async updateResource() {
		try {
			const response = await axios.put(`/api/v1/menus/${this.state.objectId}`, {
				description: this.state.description,
				discount: this.state.discount,
				startTime: this.state.startTime,
				endTime: this.state.endTime,
				items: this.state.items
			});

			if (response.data.status === 'error') {
				throw Error(response.data.message);
			}
			console.log(response.data.message);
		} catch (err) {
			console.log(err);
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
		return (
			<div>
				<h1>{this.state.isEditMode ? 'Editar Perfil' : 'Crear una cuenta'}</h1>
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
						<label htmlFor="category">Contraseña</label>
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
						<label htmlFor="name">Nombre y Apellido</label>
						<input
							className="form-control"
							id="name"
							name="name"
							placeholder="Jose Perez"
							value={this.state.name}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="company">Compañia</label>
						<input
							className="form-control"
							id="company"
							name="company"
							placeholder="Corporación ACME"
							value={this.state.company}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="department">Departamento</label>
						<input
							className="form-control"
							id="department"
							name="department"
							placeholder="Recursos Humanos"
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
							placeholder="Calle 27, #165, La Urbanización Real"
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
							placeholder="San Cristobal"
							value={this.state.state}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="addressType">Tipo de Dirección</label>
						<input
							className="form-control"
							id="addressType"
							name="addressType"
							placeholder="Oficina"
							value={this.state.addressType}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="reference">Referencia de la dirección</label>
						<input
							className="form-control"
							id="reference"
							name="reference"
							placeholder="Detras del Ayuntamiento"
							value={this.state.reference}
							onChange={this.handleInputChange}
						/>
					</div>

					<button className="btn btn-primary">Guardar</button>
				</form>
			</div>
		);
	}
}
