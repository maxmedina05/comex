import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
	component: Component,
	canActivate = false,
	...rest
}) => {
	const isActivated =
		typeof canActivate === 'function' ? canActivate() : canActivate;

	return (
		<Route
			{...rest}
			render={props =>
				isActivated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
