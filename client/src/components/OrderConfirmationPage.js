import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { OrderItemTable } from './OrderItemTable';

class OrderConfirmationPage extends Component {
	render() {
		const order = {
			totalPrice: 0,
			message: '',
			items: [
				{
					qty: 1,
					discount: 0,
					unitPrice: 0,
					_id: '5acebcb7a496982f6cfff699',
					product: {
						_id: '5ac6a567eaf0f440d490215d',
						name: 'Jugo de Chinola',
						price: 50,
						__v: 0
					}
				}
			],
			createdAt: moment(new Date('2018-04-12T01:56:07.792Z')).format(
				'ddd Do, MMMM YYYY | hh:mm a'
			),
			modifiedAt: '2018-04-12T01:56:07.792Z',
			_id: '5acebcb7a496982f6cfff698',
			offset: 240,
			shippingAddress: {
				address: 'Calle Enriquillo, #107',
				city: 'Santo Domingo',
				state: 'Santo Domingo',
				reference: 'Frente al colmado Don Ramon'
			},
			user: {
				_id: '5acebe6b1dfc4649e087ccc0',
				email: 'admin@example.com',
				fullName: 'Max Medina'
			}
		};

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
							value={order.user.fullName}
						/>
					</div>
				</div>
				<div className="form-group row">
					<label className="col-sm-2 col-form-label" htmlFor="address">
						Dirección
					</label>
					<div className="col-sm-10">
						<input
							className="form-control-plaintext"
							name="address"
							type="address"
							readOnly
							value={order.shippingAddress.address}
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
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { order: state.checkout.order };
}

export default connect(mapStateToProps, null)(OrderConfirmationPage);
