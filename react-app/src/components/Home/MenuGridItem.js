import React from 'react';

const MenuGridItem = ({ menu, onAddMealClick }) => {
	return (
		<div className="col-lg-2 col-md-3 mb-4">
			<div className="card h-100">
				<img
					className="card-img-top"
					src="http://placehold.it/160x145"
					alt=""
				/>
				<div className="card-body">
					<p className="card-title">{menu.name}</p>
				</div>
				<div className="card-footer">
					<button type="button" onClick={() => onAddMealClick(menu)}>
						Agregar
					</button>
				</div>
			</div>
		</div>
	);
};

export default MenuGridItem;
