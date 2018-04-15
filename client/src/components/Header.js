import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { submitLogin } from '../actions/auth.action';
// import LoginModal from './LoginModal';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

class Header extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

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

	renderLoginOptions() {
		const { user } = this.props;
		switch (user) {
			case null:
			case false:
				return [
					<NavItem key="signup">
						<NavLink tag={Link} to="/signup">
							Registrarse
						</NavLink>
					</NavItem>,
					<NavItem key="login">
						<NavLink tag={Link} to="/login">
							Iniciar Sessión
						</NavLink>
						{/* <LoginModal
							isAuthenticated={isAuthenticated}
							handleLogin={this.props.login}
						/> */}
					</NavItem>
				];
			default: {
				return (
					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							{`Hola ${user.userInfo.firstName}`}
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem>
								<NavItem key="profile">
									<NavLink tag={Link} to={`/users/${user.objectId}/profile`}>
										Mi Perfil
									</NavLink>
								</NavItem>
							</DropdownItem>
							<DropdownItem>
								<NavItem key="orders">
									<NavLink tag={Link} to={`/orders`}>
										Mis Pedidos
									</NavLink>
								</NavItem>
							</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>
								<NavItem key="logout">
									<NavLink href="/api/v1/auth/logout">Salir</NavLink>
								</NavItem>
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				);
			}
		}
	}

	render() {
		return (
			<Navbar color="dark" dark expand="sm" className="bg-dark header">
				<NavbarBrand href="/">COMEX</NavbarBrand>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink tag={Link} to="/">
								Menu de Hoy
							</NavLink>
						</NavItem>
						{this.renderLoginOptions()}
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		login: (email, password) => dispatch(submitLogin(email, password))
	};
}

function mapStateToProps({ authentication }) {
	return { user: authentication.payload };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
