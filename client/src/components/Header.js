import React from 'react';
import { Link } from 'react-router-dom';

function renderLoginOptions(isAuthenticated, objectId) {
	if (isAuthenticated) {
		return [
			<li key="profile">
				<Link to={`/users/${objectId}/profile`}>Mi Perfil</Link>
			</li>,
			<li key="logout">
				<a href="/api/v1/auth/logout">Logout</a>
			</li>
		];
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

function renderAdminRoutes(userRole) {
	if (userRole === 'Administrator') {
		return [
			<li key="orders">
				<Link to="/admin/orders">Ordenes</Link>
			</li>,
			<li key="products">
				<Link to="/admin/products">Products</Link>
			</li>,
			<li key="menus">
				<Link to="/admin/menus">Menus</Link>
			</li>
		];
	}
}

const Header = ({ isAuthenticated, role, objectId }) => {
	return (
		<ul>
			<li>
				<Link to="/">Menu de Hoy</Link>
			</li>
			{renderAdminRoutes(role)}
			{renderLoginOptions(isAuthenticated, objectId)}
		</ul>
	);
};

export default Header;
