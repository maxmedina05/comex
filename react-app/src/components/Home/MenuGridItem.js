import React from 'react';
import { FormattedNumber } from 'react-intl';

const MenuGridItem = ({ menu, onAddMealClick }) => {
	return (
		<div className="col-lg-2 col-md-3 mb-4">
			<div className="card h-100">
				<img className="card-img-top" src={menu.imageUrl} alt="" />
				<div className="card-body">
					<span className="badge badge-warning float-right">
						<FormattedNumber
							value={menu.price}
							style="decimal"
							minimumFractionDigits={2}
						/>
					</span>
					<span className="card-title">
						<h6>{menu.name} </h6>
					</span>
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
