import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchOrders } from '../actions/order.action';
import { fetchOneOrder } from '../actions/order.action';
import ResourceTable from './reusable-components/resource-table';

class MyOrdersPage extends Component {
	constructor(props) {
		super(props);

		this.handleShowClick = this.handleShowClick.bind(this);
	}

	componentDidMount() {
		const { userId } = this.props;
		this.props.fetchOrders(userId);
	}

	handleShowClick(order) {
		this.props.fetchOrder(order._id, this.props.history);
	}

	render() {
		const fields = [
			'#',
			{
				label: 'Código',
				value: order => {
					return order._id.substr(-4);
				}
			},
			{
				label: 'Fecha',
				value: order => {
					return moment(new Date(order.createdAt)).format('YYYY-MM-DD hh:mm a');
				}
			},
			{
				label: 'Total',
				value: 'totalPrice'
			},
			{
				label: 'Detalle',
				value: ({ items }) => {
					const names = items.map(item => item.product.name);
					return names.join(', ');
				}
			}
		];

		return (
			<div className="container">
				<div className="paper-card">
					<h1>Mis Pedidos</h1>
					<div className="table-responsive">
						<ResourceTable
							className="table table-hover"
							fields={fields}
							dataSource={this.props.items}
							handleShowClick={this.handleShowClick}
						/>
					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchOrders: userId => dispatch(fetchOrders(userId)),
		fetchOrder: (orderId, history) => dispatch(fetchOneOrder(orderId, history))
	};
}

function mapStateToProps(state) {
	const { isLoading, error, items } = state.orders;
	const { objectId } = state.authentication.payload;
	return { isLoading, error, items, userId: objectId };
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withRouter(MyOrdersPage)
);
