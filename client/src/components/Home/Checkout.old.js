import React from 'react';

function getFormattedNumber(num) {
	return parseFloat(Math.round(num * 100) / 100).toFixed(2);
}

function computeTotalPrice(items) {
	var sum = 0;
	for (const item of items) {
		sum += item.product.price;
	}
	return sum;
}

const OrderItemRow = ({
	product,
	qty,
	removeItem,
	addItem,
	decreaseItemCount
}) => {
	return (
		<tr>
			<td>{qty} x</td>
			<td>{product.name} </td>
			<td>{getFormattedNumber(product.price)} DOP</td>
			<td />
			<td>
				<button
					className="btn btn-light"
					type="button"
					onClick={() => addItem(product)}
				>
					<i className="fa fa-plus-circle" />
				</button>
				<button
					className="btn btn-light"
					type="button"
					onClick={() => decreaseItemCount(product)}
				>
					<i className="fa fa-minus-circle" />
				</button>
				<button
					className="btn btn-light"
					type="button"
					onClick={() => removeItem(product)}
				>
					<i className="fa fa-trash" />
				</button>
			</td>
		</tr>
	);
};

const OrderItemTable = ({
	items,
	handleAddOrderItem,
	handleRemoveOrderItem,
	handleDecreaseOrderItemCount
}) => {
	return (
		<table className="table">
			<tbody>
				{items.map(item => (
					<OrderItemRow
						key={item.product._id}
						{...item}
						removeItem={handleRemoveOrderItem}
						addItem={handleAddOrderItem}
						decreaseItemCount={handleDecreaseOrderItemCount}
					/>
				))}
				<tr>
					<td colSpan="3" />
				</tr>
				<tr>
					<td>Total</td>
					<td>{getFormattedNumber(computeTotalPrice(items))}</td>
				</tr>
			</tbody>
		</table>
	);
};

const Checkout = ({
	orderItems,
	handleAddOrderItem,
	handleRemoveOrderItem,
	handleDecreaseOrderItemCount,
	inputChange,
	submitOrder
}) => {
	return (
		<form onSubmit={submitOrder}>
			<h2>Caja</h2>
			<h5>Quiero Ordernar:</h5>

			<OrderItemTable
				items={orderItems}
				handleAddOrderItem={handleAddOrderItem}
				handleRemoveOrderItem={handleRemoveOrderItem}
				handleDecreaseOrderItemCount={handleDecreaseOrderItemCount}
			/>
			<div className="form-group">
				<label htmlFor="message">Mensaje para el provedor</label>
				<textarea
					className="form-control"
					name="message"
					id="message"
					row="3"
					onChange={inputChange}
				/>
			</div>
			<button type="reset" className="btn btn-danger">
				Cancelar
			</button>
			<button type="submit" className="btn btn-primary">
				Ordenar
			</button>
		</form>
	);
};

export default Checkout;
