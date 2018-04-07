import React, { Component } from 'react';
import axios from 'axios';

import MenuGrid from './MenuGrid';
import Checkout from './Checkout';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.addMeal = this.addMeal.bind(this);
		this.removeMeal = this.removeMeal.bind(this);
		this.loadMenuData = this.loadMenuData.bind(this);
		this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = {
			meals: [],
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

	// TODO: Prevent already existing item from being added
	addMeal(meal) {
		this.setState({
			meals: [...this.state.meals, meal]
		});
	}

	removeMeal(id) {
		const meals = this.state.meals.filter(x => x.id !== id);

		this.setState({
			meals: meals
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
						<MenuGrid onAddMealClick={this.addMeal} menu={this.state.menu} />
					</div>
					<div className="col-md-3">
						<Checkout
							meals={this.state.meals}
							removeMeal={this.removeMeal}
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
