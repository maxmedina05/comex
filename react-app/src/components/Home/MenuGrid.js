import React from 'react';
import MenuGridItem from './MenuGridItem';

const MENU = [
	{
		id: 1,
		name: 'Arroz Primavera con Pollo',
		price: '200'
	},
	{
		id: 2,
		name: 'Pechuga rellena de Queso',
		price: '250'
	},
	{
		id: 3,
		name: 'Lasagna',
		price: '300'
	}
];

const MenuGrid = props => {
	return (
		<div className="row">
			{MENU.map((menu, index) => (
				<MenuGridItem
					key={index}
					menu={menu}
					onAddMealClick={props.onAddMealClick}
				/>
			))}
		</div>
	);
};

export default MenuGrid;
