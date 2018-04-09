import React, { Component } from 'react';
import axios from 'axios';

import MenuGrid from './MenuGrid';
import Checkout from './Checkout.old';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.handleAddOrderItem = this.handleAddOrderItem.bind(this);
		this.handleRemoveOrderItem = this.handleRemoveOrderItem.bind(this);
		this.handleDecreaseOrderItemCount = this.handleDecreaseOrderItemCount.bind(
			this
		);
		this.loadMenuData = this.loadMenuData.bind(this);
		this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = {
			orderItems: [],
			menu: [],
			message: ''
		};
	}

	componentDidMount() {
		this.loadMenuData();
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	async loadMenuData() {
		try {
			const response = await axios('/api/v1/menus/available');
			const body = response.data;
			if (body.status === 'success') {
				this.setState({
					menu: body.data.items
				});
			} else {
				throw Error(body.message);
			}
		} catch (err) {
			console.log(err.message || err);
		}
	}

	handleAddOrderItem(menuItem) {
		let orderItem = this.state.orderItems.find(
			x => x.product._id === menuItem._id
		);
		if (orderItem) {
			orderItem.qty += 1;
		} else {
			orderItem = {
				product: menuItem,
				qty: 1
			};
		}

		this.setState({
			orderItems: [
				...this.state.orderItems.filter(x => x.product._id !== menuItem._id),
				orderItem
			]
		});
	}

	handleDecreaseOrderItemCount(menuItem) {
		const orderItem = this.state.orderItems.find(
			x => x.product._id === menuItem._id
		);
		orderItem.qty -= 1;
		if (orderItem.qty === 0) {
			this.handleRemoveOrderItem(menuItem);
		}
		this.setState({
			orderItems: [
				...this.state.orderItems.filter(x => x.product._id !== menuItem._id),
				orderItem
			]
		});
	}

	handleRemoveOrderItem(menuItem) {
		const orderItems = this.state.orderItems.filter(
			x => x.product._id !== menuItem._id
		);
		this.setState({
			orderItems: orderItems
		});
	}

	// TODO: Add real customer
	async handleSubmitOrder(event) {
		event.preventDefault();
		console.log(this.state);
		const items = this.state.meals;
		const message = this.state.message;

		if (items.length > 0) {
			try {
				const response = await axios.post('/api/v1/orders', {
					items,
					message,
					createdAt: new Date(),
					customer: 'guest'
				});
				const body = response.data;

				if (body.status === 'success') {
					this.setState({
						message: '',
						meals: []
					});
				} else {
					throw Error(body.message);
				}
			} catch (err) {
				console.log(err.message || err);
			}
		}
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-9">
						<h1>Menu de Hoy</h1>
						<MenuGrid
							onAddMealClick={this.handleAddOrderItem}
							menu={this.state.menu}
						/>
					</div>
					<div className="col-md-3">
						<Checkout
							orderItems={this.state.orderItems}
							handleAddOrderItem={this.handleAddOrderItem}
							handleRemoveOrderItem={this.handleRemoveOrderItem}
							handleDecreaseOrderItemCount={this.handleDecreaseOrderItemCount}
							submitOrder={this.handleSubmitOrder}
							inputChange={this.handleInputChange}
							onSubmit={this.handleSubmitOrder}
						/>
					</div>
				</div>
			</div>
		);
	}
}
