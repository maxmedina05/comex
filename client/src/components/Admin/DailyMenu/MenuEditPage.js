import React, { Component } from 'react';
import Datetime from 'react-datetime';
import { Async } from 'react-select';

import axios from 'axios';

const MenuItemTableRow = ({ product, discount, handleRemoveProductAction }) => {
	return (
		<tr>
			<td>{product._id.substr(-4)}</td>
			<td>{product.name}</td>
			<td>{product.price}</td>
			<td>{discount}</td>
			<td>
				<button
					className="btn btn-warning"
					onClick={event => handleRemoveProductAction(event, product)}
				>
					Eliminar
				</button>
			</td>
		</tr>
	);
};

const MenuItemTable = ({ items, handleRemoveProductAction }) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Id</th>
					<th>Nombre</th>
					<th>Precio</th>
					<th>Descuento</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{items.map(item => (
					<MenuItemTableRow
						{...item}
						key={item.product._id}
						handleRemoveProductAction={handleRemoveProductAction}
					/>
				))}
			</tbody>
		</table>
	);
};

export default class DailyMenuEditPage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.getProducts = this.getProducts.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
		this.loadResource = this.loadResource.bind(this);
		this.createNewResource = this.createNewResource.bind(this);
		this.updateResource = this.updateResource.bind(this);

		this.handleRemoveProductAction = this.handleRemoveProductAction.bind(this);

		this.state = {
			objectId: '0',
			isEditMode: false,
			items: [],
			startDate: new Date(),
			endDate: new Date(),
			discount: 0.0,
			name: '',
			selectedProduct: {}
		};
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		if (params.objectId !== 'new') {
			this.setState({ isEditMode: true });
			this.loadResource(params.objectId);
		}
	}

	handleRemoveProductAction(event, product) {
		event.preventDefault();
		this.setState({
			items: this.state.items.filter(x => x.product._id !== product._id)
		});
	}

	async getProducts(input, callback) {
		try {
			const response = await axios('/api/v1/products');
			const body = response.data;

			if (body.status === 'success') {
				return { options: body.data };
			} else {
				throw Error(body.message);
			}
		} catch (err) {
			console.log(err.message || err);
			return { options: [] };
		}
	}

	async loadResource(objectId) {
		try {
			const response = await axios.get(`/api/v1/menus/${objectId}`);
			const body = response.data;
			if (body.status === 'success') {
				this.setState({
					objectId: body.data._id,
					items: body.data.items,
					startDate: body.data.startDate,
					endDate: body.data.endDate,
					name: body.data.name,
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
				name: this.state.name,
				startDate: this.state.startDate,
				endDate: this.state.endDate,
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
		console.log(target);

		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSelectChange(product) {
		const discount = this.state.discount;
		this.setState({
			selectedProduct: product,
			items: [...this.state.items, { product, discount }]
		});
	}

	handleStartDateChange(moment) {
		this.setState({ startDate: moment.toDate() });
	}

	handleEndDateChange(moment) {
		this.setState({ endDate: moment.toDate() });
	}

	render() {
		return (
			<div>
				<h1>{this.state.isEditMode ? 'Editar Menu' : 'Agregar Menu'}</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Nombre del Menu</label>
						<input
							className="form-control"
							id="name"
							name="name"
							placeholder="Menu de la Semana"
							value={this.state.name}
							onChange={this.handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="startDate">Tiempo de Inicio</label>
						<Datetime
							id="startDate"
							name="startDate"
							dateFormat={false}
							value={this.state.startDate}
							onChange={this.handleStartDateChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="startDate">Tiempo de Fin</label>
						<Datetime
							dateFormat={false}
							id="endDate"
							name="endDate"
							value={this.state.endDate}
							onChange={this.handleEndDateChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="discount">Descuento General</label>
						<input
							type="number"
							className="form-control"
							id="discount"
							name="discount"
							value={this.state.discount}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="product">Product a agregar</label>
						<Async
							name="selectedProduct"
							value={this.state.selectedProduct}
							loadOptions={this.getProducts}
							labelKey="name"
							valueKey="name"
							onChange={this.handleSelectChange}
						/>
					</div>

					<MenuItemTable
						items={this.state.items}
						handleRemoveProductAction={this.handleRemoveProductAction}
					/>

					<button className="btn btn-primary">Guardar</button>
				</form>
			</div>
		);
	}
}
