import React from 'react';
import MenuGridItem from './MenuGridItem';

const MenuGrid = ({ items, onAddMealClick }) => {
	return (
		<div className="row">
			{items.map((item, index) => (
				<MenuGridItem key={index} item={item} onAddMealClick={onAddMealClick} />
			))}
		</div>
	);
};

export default MenuGrid;
