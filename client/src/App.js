import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

import PrivateRoute from './components/PrivateRoute';

import Header from './components/Header';
import HomePage from './components/Home/HomePage';
import NotFoundPage from './components/NotFoundPage';

import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import UserProfilePage from './components/UserProfile/UserProfilePage';
import OrderConfirmationPage from './components/Home/OrderConfirmationPage';

import OrderListPage from './components/Admin/Orders/OrderListPage';
import OrderEditPage from './components/Admin/Orders/OrderEditPage';
import ProductListPage from './components/Admin/Products/ProductListPage';
import ProductEditPage from './components/Admin/Products/ProductEditPage';
import MenuEditPage from './components/Admin/DailyMenu/MenuEditPage';
import MenuListPage from './components/Admin/DailyMenu/MenuListPage';

class App extends Component {
	constructor(props) {
		super(props);

		this.canUserAccessPage = this.canUserAccessPage.bind(this);
	}

	componentDidMount() {
		this.props.fetchUser();
	}

	canUserAccessPage() {
		const user = this.props.authenticatedUser;
		if (user && user.role === 'Administrator') {
			return true;
		}
		return false;
	}

	render() {
		const isAuthenticating = this.props.authenticatedUser !== null;

		return (
			isAuthenticating && (
				<Router>
					<div>
						<Header />
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route exact path="/signup" component={RegisterPage} />
							<Route exact path="/login" component={LoginPage} />
							<Route
								exact
								path="/users/:objectId/profile"
								component={UserProfilePage}
							/>
							<Route
								exact
								path="/orders/:objectId/confirmation"
								component={OrderConfirmationPage}
							/>
							<PrivateRoute
								exact
								path="/admin/orders"
								canActivate={this.canUserAccessPage}
								component={OrderListPage}
							/>
							<Route path="/admin/orders/:objectId" component={OrderEditPage} />
							<Route exact path="/admin/products" component={ProductListPage} />
							<Route exact path="/admin/menus" component={MenuListPage} />
							<Route
								path="/admin/products/:objectId"
								component={ProductEditPage}
							/>
							<Route path="/admin/menus/:objectId" component={MenuEditPage} />
							<Route component={NotFoundPage} />
						</Switch>
					</div>
				</Router>
			)
		);
	}
}

function mapStateToProps({ authenticatedUser }) {
	return { authenticatedUser };
}

export default connect(mapStateToProps, actions)(App);
