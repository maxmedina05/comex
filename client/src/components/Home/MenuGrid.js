import React from 'react';
import MenuGridItem from './MenuGridItem';

const MenuGrid = props => {
	return (
		<div className="row">
			{props.menu.map((item, index) => (
				<MenuGridItem
					key={index}
					item={item}
					onAddMealClick={props.onAddMealClick}
				/>
			))}
		</div>
	);
};

export default MenuGrid;
