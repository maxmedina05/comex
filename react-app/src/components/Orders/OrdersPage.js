import React, { Component } from 'react';

const ORDERS = [
	{
		id: 1,
		description: 'Arroz primavera con pollo frito',
		userName: 'Juan Jose Perez'
	},
	{
		id: 2,
		description: 'Arroz Blanco con pollo Guisao',
		userName: 'Jose Perez'
	},
	{
		id: 3,
		description: 'Morro de guandoles con longaniza',
		userName: 'Pedro Perez'
	}
];

export default class OrdersPage extends Component {
	render() {
		return (
			<div className="container-fluid">
				<h1>Ordenes de Hoy: {new Date().toDateString()}</h1>

				<table className="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Descripción</th>
							<th scope="col">Para</th>
						</tr>
					</thead>
					<tbody>
						{ORDERS.map(order => (
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{order.description}</td>
								<td>{order.userName}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}
