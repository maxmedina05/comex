import React, { Component } from 'react';
import axios from 'axios';

const OrderItemRow = orderItem => {
	return (
		<tr>
			<td>{orderItem.name}</td>
			<td> DOP</td>
			<td />
			<td>
				<button type="button" className="close" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</td>
		</tr>
	);
};

const OrderItemTable = () => {
	return (
		<table className="table">
			<tbody>
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

export default class Checkout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orderItems: []
		};
	}

	render() {
		return (
			<div>
				<form>
					<h2>Caja</h2>
					<h5>Quiero Ordernar:</h5>

					<OrderItemTable />

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
