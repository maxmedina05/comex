import React, { Component } from 'react';
import MenuGrid from './MenuGrid';
import Checkout from './Checkout';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.addMeal = this.addMeal.bind(this);
		this.removeMeal = this.removeMeal.bind(this);
		this.loadMenuData = this.loadMenuData.bind(this);
		this.state = {
			meals: []
		};
	}

	componentDidMount() {
		this.loadMenuData();
	}

	loadMenuData() {}

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

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-9">
						<h1>Menu de Hoy</h1>
						<MenuGrid onAddMealClick={this.addMeal} />
					</div>
					<div className="col-md-3">
						<Checkout meals={this.state.meals} removeMeal={this.removeMeal} />
					</div>
				</div>
			</div>
		);
	}
}
