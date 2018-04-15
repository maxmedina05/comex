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
			<div className="container-fluid HomePage">
				<div className="row">
					<div className="col-md-9">
						<h1 className="today-menu-title">Menu de Hoy</h1>
						<MenuGrid
							onAddOrderItemToCart={this.props.handleAddOrderItemToCart}
							items={items}
						/>
					</div>
					<div className="col-md-3">
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
	const { menu, isFetching } = state.todaysMenu;
	return { menu, isFetching };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
