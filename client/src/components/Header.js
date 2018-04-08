import React from 'react';
import { Link } from 'react-router-dom';

function renderLoginOptions(isAuthenticated) {
	if (isAuthenticated) {
		return (
			<li>
				<a href="/api/v1/auth/logout">Logout</a>
			</li>
		);
	}

	return [
		<li key="register">
			<Link to="/signup">Registrarse</Link>
		</li>,
		<li key="login">
			<Link to="/login">Iniciar Sessión</Link>
		</li>
	];
}

const Header = ({ isAuthenticated }) => {
	return (
		<ul>
			<li>
				<Link to="/">Menu de Hoy</Link>
			</li>
			<li>
				<Link to="/admin/orders">Ordenes</Link>
			</li>
			<li>
				<Link to="/admin/products">Products</Link>
			</li>
			<li>
				<Link to="/admin/menus">Menus</Link>
			</li>

			{renderLoginOptions(isAuthenticated)}
		</ul>
	);
};

export default Header;
