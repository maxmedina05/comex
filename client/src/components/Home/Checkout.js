import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	removeOrderItemFromCart,
	incrementOrderItemCount,
	decrementOrderItemCount
} from '../../actions/checkout.action';

const OrderItemRow = ({
	item,
	handleRemoveOrderItemFromCart,
	handleIncrementOrderItemCount,
	handleDecrementOrderItemCount
}) => {
	const { product, qty } = item;
	return (
		<tr>
			<td>{qty} x</td>
			<td>{product.name} </td>
			<td>{product.price} DOP</td>
			<td>
				<button
					className="btn btn-light"
					type="button"
					onClick={() => handleIncrementOrderItemCount(item)}
				>
					<i className="fa fa-plus-circle" />
				</button>
				<button
					className="btn btn-light"
					type="button"
					onClick={() => handleDecrementOrderItemCount(item)}
				>
					<i className="fa fa-minus-circle" />
				</button>
				<button
					className="btn btn-light"
					type="button"
					onClick={() => handleRemoveOrderItemFromCart(item)}
				>
					<i className="fa fa-trash" />
				</button>
			</td>
		</tr>
	);
};

const OrderItemTable = ({
	items,
	handleRemoveOrderItemFromCart,
	handleIncrementOrderItemCount,
	handleDecrementOrderItemCount
}) => {
	return (
		<table className="table">
			<tbody>
				{items.map(item => (
					<OrderItemRow
						key={item.id}
						item={item}
						handleRemoveOrderItemFromCart={handleRemoveOrderItemFromCart}
						handleIncrementOrderItemCount={handleIncrementOrderItemCount}
						handleDecrementOrderItemCount={handleDecrementOrderItemCount}
					/>
				))}
				<tr>
					<td colSpan="3" />
				</tr>
				<tr>
					<td>Total</td>
					<td>{0.0}</td>
				</tr>
			</tbody>
		</table>
	);
};

class Checkout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: ''
		};
	}

	render() {
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
						/>
					</div>
					<button type="reset" className="btn btn-danger">
						Cancelar
					</button>
					<button type="submit" className="btn btn-primary">
						Ordenar
					</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { orderItems: state.orderItems };
}

function mapDispatchToProps(dispatch) {
	return {
		handleRemoveOrderItemFromCart: orderItem =>
			dispatch(removeOrderItemFromCart(orderItem)),
		handleIncrementOrderItemCount: orderItem =>
			dispatch(incrementOrderItemCount(orderItem)),
		handleDecrementOrderItemCount: orderItem =>
			dispatch(decrementOrderItemCount(orderItem))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
