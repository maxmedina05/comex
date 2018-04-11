import React from 'react';
import MenuGridItem from './MenuGridItem';

const MenuGrid = ({ items, onAddOrderItemToCart }) => {
	return (
		<div className="row">
			{items.map((item, index) => (
				<MenuGridItem
					key={index}
					item={item}
					onAddOrderItemToCart={onAddOrderItemToCart}
				/>
			))}
		</div>
	);
};

export default MenuGrid;
