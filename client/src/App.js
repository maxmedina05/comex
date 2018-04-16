import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from './actions/auth.action';
import PrivateRoute from './components/PrivateRoute';

import Header from './components/Header';
import HomePage from './components/HomePage';
import NotFoundPage from './components/NotFoundPage';

import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import UserProfilePage from './components/UserProfile/UserProfilePage';
import MyOrdersPage from './components/MyOrdersPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';

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
		// const user = this.props.authentication.payload;
		// if (user && user.role === 'Administrator') {
		// 	return true;
		// }
		return false;
	}

	render() {
		const { isLoading } = this.props;

		return (
			!isLoading && (
				<Router>
					<div>
						<Header />
						<ToastContainer />
						<Switch>
							<Route exact path="/" component={HomePage} />
							<Route path="/signup" component={RegisterPage} />
							<Route path="/login" component={LoginPage} />
							<Route
								path="/users/:objectId/profile"
								component={UserProfilePage}
							/>
							<Route exact path="/orders" component={MyOrdersPage} />
							<Route
								path="/orders/:objectId/confirmation"
								component={OrderConfirmationPage}
							/>

							{/* TODO: needs refactorgin */}
							<Route
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

function mapDispatchToProps(dispatch) {
	return {
		fetchUser: () => dispatch(fetchUser())
	};
}

function mapStateToProps({ authentication }) {
	return { user: authentication.payload, isLoading: authentication.isLoading };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
