import React from 'react';

function toDecimal(number) {
	return (Math.round(number * 100) / 100).toFixed(2);
}

const MenuGridItem = ({ item, onAddOrderItemToCart }) => {
	const product = item.product;

	return (
		<div className="col-md-4 mb-4">
			<div className="MenuGridItem">
				<img
					src={
						product.imageUrl
							? product.imageUrl
							: 'http://lorempizza.com/380/240'
					}
					alt={product.name}
				/>
				<div className="MenuGridItemContent">
					<h6>{product.name}</h6>
					<div>
						<span>
							<span className="badge badge-warning">
								DOP {toDecimal(product.price)}
							</span>
						</span>
						<button className="btn btn-danger">Agregar</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MenuGridItem;
