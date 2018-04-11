import React from 'react';
import { FormattedNumber } from 'react-intl';

const MenuGridItem = ({ item, onAddOrderItemToCart }) => {
	const product = item.product;

	return (
		<div className="col-lg-2 col-md-3 mb-4">
			<div className="card h-100">
				<img
					className="card-img-top"
					src={
						product.imageUrl
							? product.imageUrl
							: 'http://lorempizza.com/380/240'
					}
					alt=""
				/>
				<div className="card-body">
					<span className="badge badge-warning float-right">
						<FormattedNumber value={product.price} minimumFractionDigits={2} />
					</span>
					<span className="card-title">
						<h6>{product.name} </h6>
					</span>
				</div>
				<div className="card-footer">
					<button type="button" onClick={() => onAddOrderItemToCart(item)}>
						Agregar
					</button>
				</div>
			</div>
		</div>
	);
};

export default MenuGridItem;
