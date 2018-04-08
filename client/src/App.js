import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import AppliedRoute from './components/AppliedRoute';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import HomePage from './components/Home/HomePage';
import NotFoundPage from './components/NotFoundPage';
import OrderListPage from './components/Admin/Orders/OrderListPage';
import OrderEditPage from './components/Admin/Orders/OrderEditPage';
import ProductListPage from './components/Admin/Products/ProductListPage';
import ProductEditPage from './components/Admin/Products/ProductEditPage';
import MenuEditPage from './components/Admin/DailyMenu/MenuEditPage';
import MenuListPage from './components/Admin/DailyMenu/MenuListPage';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import UserProfilePage from './components/UserProfile/UserProfilePage';

class App extends Component {
	constructor(props) {
		super(props);

		this.userHasAuthenticated = this.userHasAuthenticated.bind(this);
		this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
		this.state = {
			isAuthenticated: false,
			isAuthenticating: true,
			objectId: '',
			role: 'Customer'
		};
	}

	componentDidMount() {
		this.isUserAuthenticated();
	}

	async isUserAuthenticated() {
		try {
			const response = await axios.get('/api/v1/auth/user');
			const body = response.data;

			if (body.status === 'error') {
				throw Error('User is not authenticated.');
			}

			this.setState({
				isAuthenticated: true,
				role: body.data.role,
				objectId: body.data.objectId
			});
		} catch (err) {
			console.log(err.message || err);
		} finally {
			this.setState({
				isAuthenticating: false
			});
		}
	}

	userHasAuthenticated(authenticatedUser) {
		if (authenticatedUser.authenticated) {
			this.setState({
				isAuthenticated: authenticatedUser.authenticated,
				role: authenticatedUser.role,
				objectId: authenticatedUser.objectId
			});
		}
	}

	render() {
		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated
		};

		return (
			!this.state.isAuthenticating && (
				<Router>
					<div>
						<Header
							isAuthenticated={this.state.isAuthenticated}
							objectId={this.state.objectId}
							role={this.state.role}
						/>
						<Switch>
							<Route exact path="/" component={HomePage} />
							<AppliedRoute
								exact
								path="/signup"
								component={RegisterPage}
								props={childProps}
							/>
							<AppliedRoute
								exact
								path="/login"
								component={LoginPage}
								props={childProps}
							/>

							<PrivateRoute
								exact
								path="/users/:objectId/profile"
								isAuthenticated={this.state.isAuthenticated}
								component={UserProfilePage}
							/>
							<PrivateRoute
								exact
								path="/admin/orders"
								isAuthenticated={this.state.isAuthenticated}
								component={OrderListPage}
							/>
							<PrivateRoute
								path="/admin/orders/:objectId"
								isAuthenticated={this.state.isAuthenticated}
								component={OrderEditPage}
							/>
							<PrivateRoute
								exact
								path="/admin/products"
								isAuthenticated={this.state.isAuthenticated}
								component={ProductListPage}
							/>
							<PrivateRoute
								exact
								path="/admin/menus"
								isAuthenticated={this.state.isAuthenticated}
								component={MenuListPage}
							/>
							<PrivateRoute
								path="/admin/products/:objectId"
								isAuthenticated={this.state.isAuthenticated}
								component={ProductEditPage}
							/>
							<PrivateRoute
								path="/admin/menus/:objectId"
								isAuthenticated={this.state.isAuthenticated}
								component={MenuEditPage}
							/>
							<Route component={NotFoundPage} />
						</Switch>
					</div>
				</Router>
			)
		);
	}
}

export default App;
