import React from 'react';

function getFormattedNumber(num) {
	return parseFloat(Math.round(num * 100) / 100).toFixed(2);
}

function computeTotalPrice(meals) {
	var sum = 0;
	for (const meal of meals) {
		sum += meal.price;
	}
	return sum;
}

const MealTableRow = props => {
	return (
		<tr>
			<td>{props.name} </td>
			<td>{getFormattedNumber(props.price)} DOP</td>
			<td />
			<td>
				<button
					type="button"
					className="close"
					aria-label="Close"
					onClick={() => props.removeMeal(props.id)}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</td>
		</tr>
	);
};

const Checkout = ({ meals, removeMeal }) => {
	return (
		<form>
			<h2>Caja</h2>
			<h5>Quiero Ordernar:</h5>

			<table className="table">
				<tbody>
					{meals.map(meal => (
						<MealTableRow key={meal.id} {...meal} removeMeal={removeMeal} />
					))}

					<tr>
						<td colSpan="3" />
					</tr>

					<tr>
						<td>Sub Total</td>
						<td>0</td>
					</tr>
					<tr>
						<td>Impuestos</td>
						<td>0</td>
					</tr>

					<tr>
						<td>Total</td>
						<td>{getFormattedNumber(computeTotalPrice(meals))}</td>
					</tr>
				</tbody>
			</table>
			<div className="form-group">
				<label htmlFor="message">Mensaje para el provedor</label>
				<textarea className="form-control" id="message" row="3" />
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
