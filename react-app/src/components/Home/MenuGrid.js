import React from 'react';
import MenuGridItem from './MenuGridItem';

const MENU = [
	{
		id: 1,
		name: 'Arroz Primavera con Pechuga de Pollo',
		imageUrl:
			'http://hechoenmicasa.cl/wp-content/themes/ariztia/ajax/uploads/d14e517c1aa578d6dd1eb69a28b0a4e316539abe.jpg',
		price: 200.0
	},
	{
		id: 2,
		name: 'Pechuga de pollo rellenas de jamón y queso',
		imageUrl:
			'http://fotos2013.cloud.noticias24.com/PECHUGA-CORDON-BLEU630.jpg',
		price: 250.0
	},
	{
		id: 3,
		name: 'Auténtica lasagna italiana',
		imageUrl:
			'http://omammamia.com/traditional/wp-content/uploads/2016/05/imagen-destacada.png',
		price: 300.0
	},
	{
		id: 4,
		name: 'Agua Dasani',
		imageUrl:
			'https://ep01.epimg.net/sociedad/imagenes/2004/03/02/actualidad/1078182006_850215_0000000000_sumario_normal.jpg',
		price: 15.0
	},
	{
		id: 5,
		name: 'Coca Cola de 600 ml',
		imageUrl:
			'https://cdn.shopify.com/s/files/1/0706/6309/products/mayoreototal-caja-refresco-coca-cola-de-600-ml-con-24-botellas-coca-cola-refrescos-coca-cola-sku_large.jpg?v=1518347710',
		price: 25.0
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
