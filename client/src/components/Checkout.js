import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { OrderItemTable } from './OrderItemTable';
import WizardForm, { WizardFormStep } from './WizardForm';

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
			message: '',
			street: this.props.address ? this.props.address.street : '',
			city: this.props.address ? this.props.address.city : '',
			state: this.props.address ? this.props.address.state : '',
			reference: this.props.address
				? this.props.user.userInfo.address.reference
				: ''
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
			<WizardForm stepCount={2}>
				<h2>Caja Funcionando</h2>
				<WizardFormStep step={1}>
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
				</WizardFormStep>

				<WizardFormStep step={2}>
					<h5>Datos de envio:</h5>
					<div className="form-group">
						<label htmlFor="customerName">Nombre</label>
						<input
							readOnly
							className="form-control"
							name="customerName"
							value={this.props.user.customerName}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="address">Calle</label>
						<input
							className="form-control"
							name="address"
							value={this.state.address}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="city">Sector</label>
						<input
							className="form-control"
							name="city"
							value={this.state.city}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="state">Provincia</label>
						<input
							className="form-control"
							name="state"
							value={this.state.state}
							onChange={this.handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="reference">Referencia</label>
						<input
							className="form-control"
							name="reference"
							value={this.state.reference}
							onChange={this.handleInputChange}
						/>
					</div>

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
				</WizardFormStep>
			</WizardForm>
		);
	}
}

function mapStateToProps(state) {
	const { isSubmitting, hasErrors, order } = state.checkout;
	const { fullName, userInfo } = state.authentication.payload;

	let user = {
		email: '',
		customerName: fullName ? fullName : '',
		address: {
			street: userInfo ? userInfo.address.street : '',
			city: userInfo ? userInfo.address.city : '',
			state: userInfo ? userInfo.address.state : '',
			reference: userInfo ? userInfo.address.reference : ''
		}
	};
	return {
		user,
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
