import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
	renderAdminRoutes(authenticatedUser) {
		if (authenticatedUser.role === 'Administrator') {
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

	renderLoginOptions(authenticatedUser) {
		const isAuthenticated = authenticatedUser;
		switch (isAuthenticated) {
			case null:
				return;
			case false:
				return [
					<li key="register">
						<Link to="/signup">Registrarse</Link>
					</li>,
					<li key="login">
						<Link to="/login">Iniciar Sessión</Link>
					</li>
				];
			default:
				return [
					<li key="profile">
						<Link to={`/users/${authenticatedUser.objectId}/profile`}>
							Mi Perfil
						</Link>
					</li>,
					<li key="logout">
						<a href="/api/v1/auth/logout">Logout</a>
					</li>
				];
		}
	}

	render() {
		return (
			<ul>
				<li>
					<Link to="/">Menu de Hoy</Link>
				</li>
				{this.renderAdminRoutes(this.props.authenticatedUser)}
				{this.renderLoginOptions(this.props.authenticatedUser)}
			</ul>
		);
	}
}

function mapStateToProps({ authenticatedUser }) {
	return { authenticatedUser };
}

export default connect(mapStateToProps)(Header);
