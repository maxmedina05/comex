import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { OrderItemTable } from './OrderItemTable';

class OrderConfirmationPage extends Component {
	constructor(props) {
		super(props);

		this.handleGoBackClick = this.handleGoBackClick.bind(this);

		this.state = {
			redirectToReferrer: false
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	handleGoBackClick() {
		this.setState({
			redirectToReferrer: true
		});
	}

	render() {
		const { from } = this.props.location.state || { from: { pathname: '/' } };
		let order = this.props.order;
		const { redirectToReferrer } = this.state;

		if (order === null || redirectToReferrer === true) {
			return <Redirect to={from} />;
		}

		order.createdAt = moment(new Date(order.createdAt)).format(
			'ddd Do, MMMM YYYY | hh:mm a'
		);

		return (
			<div className="container">
				<h1>Order Confirmation</h1>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label" htmlFor="orderDate">
						Fecha de Order
					</label>
					<div className="col-sm-10">
						<input
							className="form-control-plaintext"
							name="orderDate"
							type="orderDate"
							readOnly
							value={order.createdAt}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label" htmlFor="fullName">
						Nombre
					</label>
					<div className="col-sm-10">
						<input
							className="form-control-plaintext"
							name="fullName"
							type="fullName"
							readOnly
							value={order.customerName}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label" htmlFor="street">
						Calle
					</label>
					<div className="col-sm-10">
						<input
							className="form-control-plaintext"
							name="street"
							type="street"
							readOnly
							value={order.shippingAddress.street}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label" htmlFor="city">
						Sector
					</label>
					<div className="col-sm-10">
						<input
							className="form-control-plaintext"
							name="city"
							type="city"
							readOnly
							value={order.shippingAddress.city}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label" htmlFor="state">
						Provincia
					</label>
					<div className="col-sm-10">
						<input
							className="form-control-plaintext"
							name="state"
							type="state"
							readOnly
							value={order.shippingAddress.state}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label" htmlFor="reference">
						Referencia
					</label>
					<div className="col-sm-10">
						<input
							className="form-control-plaintext"
							name="reference"
							type="reference"
							readOnly
							value={order.shippingAddress.reference}
						/>
					</div>
				</div>
				<h5>Productos</h5>
				<OrderItemTable items={order.items} hideActions={true} />

				<button className="btn btn-info" onClick={this.handleGoBackClick}>
					Regresar
				</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { order: state.checkout.order };
}

export default connect(mapStateToProps, null)(OrderConfirmationPage);
