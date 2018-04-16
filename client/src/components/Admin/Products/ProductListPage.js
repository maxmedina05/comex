import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ResourceTable from '../../reusable-components/resource-table.old';
import axios from 'axios';

export default class ProductListPage extends Component {
	constructor(props) {
		super(props);

		this.header = ['id', 'Nombre', 'Categoría', 'Precio'];
		this.displayFields = ['name', 'category', 'price'];
		this.handleListItemClick = this.handleListItemClick.bind(this);
		this.handleDeleteActionClick = this.handleDeleteActionClick.bind(this);
		this.loadProducts = this.loadProducts.bind(this);
		this.state = {
			products: []
		};
	}

	componentDidMount() {
		this.loadProducts();
	}

	handleListItemClick(objectId) {
		this.props.history.push(`/admin/products/${objectId}`, objectId);
	}

	async handleDeleteActionClick(objectId) {
		try {
			const response = await axios.delete(`/api/v1/products/${objectId}`);
			const body = response.data;

			if (body.status === 'success') {
				window.location.reload();
			} else {
				throw Error(body.message);
			}
		} catch (err) {
			console.log(err.message || err);
		}
	}

	async loadProducts() {
		try {
			const response = await axios('/api/v1/products');
			const body = response.data;

			if (body.status === 'success') {
				this.setState({
					products: body.data
				});
			} else {
				throw Error(body.message);
			}
		} catch (err) {
			console.log(err.message || err);
		}
	}

	render() {
		return (
			<div className="container">
				<h1>Product List Page</h1>
				<Link to="/admin/products/new">Agregar Producto Nuevo</Link>
				<ResourceTable
					header={this.header}
					dataSource={this.state.products}
					displayFields={this.displayFields}
					listItemClick={this.handleListItemClick}
					deleteActionClick={this.handleDeleteActionClick}
				/>
			</div>
		);
	}
}
