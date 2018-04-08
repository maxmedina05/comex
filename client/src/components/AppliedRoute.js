import React from 'react';
import { Route } from 'react-router-dom';

export default ({ component: Component, props: cProps, ...rest }) => (
	<Route {...rest} render={props => <Component {...props} {...cProps} />} />
);
