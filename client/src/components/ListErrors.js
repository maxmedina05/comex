import React from 'react';

const ListErrors = props => {
	const { errors } = props;
	if (errors) {
		return (
			<ul className="list-errors">
				{errors.map(key => {
					return <li key={key}>{key}</li>;
				})}
			</ul>
		);
	} else {
		return null;
	}
};

export default ListErrors;
