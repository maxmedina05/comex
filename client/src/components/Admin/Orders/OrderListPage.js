import React, { Component } from 'react';
import ResourceTable from '../../reusable-components/resource-table.old';
import axios from 'axios';

export default class OrderListPage extends Component {
	constructor(props) {
		super(props);

		this.header = ['Código', 'Fecha', 'Cliente', 'Estado', 'Mensaje'];
		this.displayFields = ['createdAt', 'customer', 'status', 'message'];
		this.handleListItemClick = this.handleListItemClick.bind(this);
		this.handleDeleteActionClick = this.handleDeleteActionClick.bind(this);
		this.loadOrders = this.loadOrders.bind(this);
		this.state = {
			orders: []
		};
	}

	componentDidMount() {
		this.loadOrders();
	}

	handleListItemClick(objectId) {
		this.props.history.push(`/admin/orders/${objectId}`, objectId);
	}

	async handleDeleteActionClick(objectId) {
		try {
			const response = await axios.delete(`/api/v1/orders/${objectId}`);
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

	async loadOrders() {
		try {
			const response = await axios('/api/v1/orders');
			const body = response.data;

			if (body.status === 'success') {
				this.setState({
					orders: body.data.map(order => ({
						...order,
						createdAt: new Date(order.createdAt).toDateString()
					}))
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
			<div>
				<h1>Listado de Ordenes</h1>

				<ResourceTable
					header={this.header}
					dataSource={this.state.orders}
					displayFields={this.displayFields}
					listItemClick={this.handleListItemClick}
					// deleteActionClick={this.handleDeleteActionClick}
				/>
			</div>
		);
	}
}
