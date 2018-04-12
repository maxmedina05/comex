import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { OrderItemTable } from './OrderItemTable';
import {
	removeOrderItemFromCart,
	incrementOrderItemCount,
	decrementOrderItemCount,
	submitOrder
} from '../actions/checkout.action';

class Checkout extends Component {
	constructor(props) {
		super(props);

		this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = {
			message: ''
		};
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmitOrder(event) {
		event.preventDefault();
		if (this.props.orderItems && this.props.orderItems.length >= 0) {
			this.props.submitOrder(this.props.orderItems);
		}
	}

	render() {
		const redirectToOrderConfirmation = this.props.order !== null;

		if (redirectToOrderConfirmation) {
			return (
				<Redirect
					to={{
						pathname: `/orders/${this.props.order._id}/confirmation`,
						state: { from: this.props.location }
					}}
				/>
			);
		}

		return (
			<div>
				<form>
					<h2>Caja</h2>
					<h5>Quiero Ordernar:</h5>

					<OrderItemTable
						items={this.props.orderItems}
						handleRemoveOrderItemFromCart={
							this.props.handleRemoveOrderItemFromCart
						}
						handleIncrementOrderItemCount={
							this.props.handleIncrementOrderItemCount
						}
						handleDecrementOrderItemCount={
							this.props.handleDecrementOrderItemCount
						}
					/>

					<div className="form-group">
						<label htmlFor="message">Mensaje para el provedor</label>
						<textarea
							className="form-control"
							name="message"
							id="message"
							row="3"
							value={this.state.message}
							onChange={this.handleInputChange}
						/>
					</div>
					<button type="reset" className="btn btn-danger">
						Cancelar
					</button>
					<button
						type="submit"
						className="btn btn-primary"
						onClick={this.handleSubmitOrder}
					>
						Siguiente
					</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { isSubmitting, hasErrors, order } = state.checkout;
	return {
		order,
		orderItems: state.orderItems,
		isSubmitting,
		hasErrors
	};
}

function mapDispatchToProps(dispatch) {
	return {
		handleRemoveOrderItemFromCart: orderItem =>
			dispatch(removeOrderItemFromCart(orderItem)),
		handleIncrementOrderItemCount: orderItem =>
			dispatch(incrementOrderItemCount(orderItem)),
		handleDecrementOrderItemCount: orderItem =>
			dispatch(decrementOrderItemCount(orderItem)),
		submitOrder: (items, shippingAddress, message) =>
			dispatch(submitOrder(items, shippingAddress, message))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);