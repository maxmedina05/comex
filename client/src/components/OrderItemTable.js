import React from 'react';

function computeTotalPrice(items) {
	let total = 0;
	for (const item of items) {
		total += computePrice(item);
	}
	return total;
}

function computePrice(item) {
	return Math.abs(item.unitPrice - item.discount) * item.qty;
}

function trimLongText(text) {
	return text.length > 15 ? text.slice(0, 15) + '...' : text;
}

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
			<td>{qty}x</td>
			<td>{product.name} </td>
			<td>DOP {computePrice(item)}</td>
			{!hideActions && (
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
		<table className="table table-hover table-sm">
			<tbody>
				{items.map(item => (
					<OrderItemRow
						key={item.id}
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
					<td colSpan="1" />
					<td>DOP {computeTotalPrice(items)}</td>
				</tr>
			</tbody>
		</table>
	);
};
