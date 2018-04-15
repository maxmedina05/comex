import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

		const { user } = this.props;

		this.state = {
			message: '',
			street: user ? user.address.street : '',
			city: user ? user.address.city : '',
			state: user ? user.address.state : '',
			reference: user ? user.address.reference : ''
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

	handleSubmitOrder() {
		console.log('handleSubmitOrder');
		if (this.props.orderItems && this.props.orderItems.length >= 0) {
			const { street, city, state, reference, message } = this.state;
			const address = {
				street,
				city,
				state,
				reference
			};
			this.props.submitOrder(
				{
					items: this.props.orderItems,
					address,
					message
				},
				this.props.history
			);
		}
	}

	render() {
		return (
			<WizardForm
				className="WizardForm"
				stepCount={3}
				lastAction="Pedir"
				handleSubmit={this.handleSubmitOrder}
			>
				<h2>Caja</h2>
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
						<label htmlFor="street">Calle</label>
						<input
							className="form-control"
							name="street"
							value={this.state.street}
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
							row="3"
							value={this.state.message}
							onChange={this.handleInputChange}
						/>
					</div>
				</WizardFormStep>

				<WizardFormStep step={3}>
					<h5>Confirmación de Pedido</h5>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label" htmlFor="customerName">
							Nombre:
						</label>
						<div className="col-sm-10">
							<input
								readOnly
								className="form-control-plaintext"
								name="customerName"
								value={this.props.user.customerName}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label" htmlFor="street">
							Calle:
						</label>
						<div className="col-sm-10">
							<input
								readOnly
								className="form-control-plaintext"
								name="street"
								value={this.state.street}
							/>
						</div>
					</div>
					<div className="form-group row">
						<label className="col-sm-2 col-form-label" htmlFor="city">
							Sector:
						</label>
						<div className="col-sm-10">
							<input
								readOnly
								className="form-control-plaintext"
								name="city"
								value={this.state.city}
							/>
						</div>
					</div>

					<div className="form-group row">
						<label className="col-sm-2 col-form-label" htmlFor="state">
							Provincia:
						</label>
						<div className="col-sm-10">
							<input
								readOnly
								className="form-control-plaintext"
								name="state"
								value={this.state.state}
							/>
						</div>
					</div>

					<div className="form-group row">
						<label className="col-sm-3 col-form-label" htmlFor="reference">
							Referencia:
						</label>
						<div className="col-sm-9">
							<input
								readOnly
								className="form-control-plaintext"
								name="reference"
								value={this.state.reference}
							/>
						</div>
					</div>

					<div className="form-group row">
						<label className="col-sm-2 col-form-label" htmlFor="message">
							Mensaje:
						</label>
						<div className="col-sm-10">
							<textarea
								className="form-control-plaintext"
								readOnly
								name="message"
								row="3"
								value={this.state.message}
							/>
						</div>
					</div>

					<div>
						<OrderItemTable items={this.props.orderItems} hideActions={true} />
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
		submitOrder: (preOrder, history) => dispatch(submitOrder(preOrder, history))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(Checkout)
);
