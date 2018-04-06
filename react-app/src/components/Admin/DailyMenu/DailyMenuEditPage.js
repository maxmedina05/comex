import React, { Component } from 'react';
import axios from 'axios';

export default class DailyMenuEditPage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.loadProduct = this.loadProduct.bind(this);
		this.createNewProduct = this.createNewProduct.bind(this);
		this.updateProduct = this.updateProduct.bind(this);

		this.state = {
			objectId: '0',
			isEditMode: false,
			name: '',
			category: '',
			price: 0.0,
			imageUrl: ''
		};
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		if (params.objectId !== 'new') {
			this.setState({ isEditMode: true });
			this.loadProduct(params.objectId);
		}
	}

	async loadProduct(objectId) {
		try {
			const response = await axios.get(`/api/v1/products/${objectId}`);
			const body = response.data;
			if (body.status === 'success') {
				this.setState({
					objectId: body.data._id,
					name: body.data.name,
					price: body.data.price,
					category: body.data.category ? body.data.category : '',
					imageUrl: body.data.imageUrl
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
			this.updateProduct();
		} else {
			this.createNewProduct();
		}
	}

	async createNewProduct() {
		try {
			const response = await axios.post('/api/v1/products', {
				name: this.state.name,
				price: this.state.price,
				category: this.state.category,
				imageUrl: this.state.imageUrl
			});

			if (response.data.status === 'error') {
				throw Error(response.data.message);
			}
			console.log(response.data.message);
		} catch (err) {
			console.log(err);
		}
	}

	async updateProduct() {
		try {
			const response = await axios.put(
				`/api/v1/products/${this.state.objectId}`,
				{
					name: this.state.name,
					price: this.state.price,
					category: this.state.category,
					imageUrl: this.state.imageUrl
				}
			);

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
				<h1>
					{this.state.isEditMode ? 'Editar Producto' : 'Agregar Producto'}
				</h1>
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
