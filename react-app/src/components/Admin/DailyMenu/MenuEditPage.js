import React, { Component } from 'react';
import axios from 'axios';

export default class DailyMenuEditPage extends Component {
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
			items: [],
			startTime: new Date(),
			endTime: new Date(),
			discount: 0.0,
			description: ''
		};
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		if (params.objectId !== 'new') {
			this.setState({ isEditMode: true });
			this.loadResource(params.objectId);
		}
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
				<h1>{this.state.isEditMode ? 'Editar Menu' : 'Agregar Menu'}</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input
							className="form-control"
							id="name"
							name="name"
							placeholder="Arroz"
							value={this.state.name}
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="category">Categoría</label>
						<input
							className="form-control"
							id="category"
							name="category"
							placeholder="Bebidas"
							value={this.state.category}
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="price">Precio</label>
						<input
							type="number"
							className="form-control"
							id="price"
							name="price"
							placeholder="100.00"
							value={this.state.price}
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="image">Imagen</label>
						<input
							type="file"
							className="form-control-file"
							id="image"
							name="image"
							onChange={this.handleInputChange}
						/>
					</div>

					<button className="btn btn-primary">Guardar</button>
				</form>
			</div>
		);
	}
}
