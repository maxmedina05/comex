import React from 'react';

function computeTotalPrice(items) {
	let total = 0;
	for (const item of items) {
		total += computePrice(item);
	}
	return toDecimal(total);
}

function computePrice(item) {
	let sum = Math.abs(item.unitPrice - item.discount) * item.quantity;
	return toDecimal(sum);
}

function toDecimal(value) {
	return parseFloat(Math.round(value * 100) / 100).toFixed(2);
}

function trimLongText(text) {
	return text.length > 15 ? text.slice(0, 12) + '...' : text;
}

const OrderItemRow = ({
	item,
	hideActions,
	handleRemoveOrderItemFromCart,
	handleIncrementOrderItemCount,
	handleDecrementOrderItemCount
}) => {
	const { product, quantity } = item;

	return (
		<tr>
			<td>{quantity}x</td>
			<td>{product.name} </td>
			<td>{computePrice(item)}</td>
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
		<div className="table-responsive-sm">
			<table className="table table-hover table-sm">
				<tbody>
					{items.map(item => (
						<OrderItemRow
							key={item.product._id}
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
		</div>
	);
};
