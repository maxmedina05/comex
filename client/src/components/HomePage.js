import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTodaysMenu } from '../actions/menu.action';
import { addOrderItemToCart } from '../actions/checkout.action';

import MenuGrid from './MenuGrid/MenuGrid';
import Checkout from './Checkout';

class HomePage extends Component {
	componentDidMount() {
		this.props.fetchTodaysMenu();
	}

	render() {
		if (this.props.isFetching || !this.props.menu) {
			return (
				<div>
					<i className="fa fa-spinner" />
				</div>
			);
		}
		const items = this.props.menu.items;
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-8">
						<h1>Menu de Hoy</h1>
						<MenuGrid
							onAddOrderItemToCart={this.props.handleAddOrderItemToCart}
							items={items}
						/>
					</div>
					<div className="col-md-4">
						<Checkout />
					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchTodaysMenu: () => dispatch(fetchTodaysMenu()),
		handleAddOrderItemToCart: menuItem => dispatch(addOrderItemToCart(menuItem))
	};
}

function mapStateToProps(state) {
	const { menu, isFetching, lastUpdated, hasErrors } = state.todaysMenu;
	return { menu, isFetching, lastUpdated, hasErrors };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
