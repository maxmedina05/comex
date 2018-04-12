import React from 'react';

const OrderItemRow = ({
	item,
	hideActions,
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
			{hideActions && (
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
			)}
		</tr>
	);
};

export const OrderItemTable = ({
	items,
	handleRemoveOrderItemFromCart,
	handleIncrementOrderItemCount,
	handleDecrementOrderItemCount,
	hideActions = false
}) => {
	return (
		<table className="table">
			<tbody>
				{items.map(item => (
					<OrderItemRow
						key={item._id}
						item={item}
						hideActions={hideActions}
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
