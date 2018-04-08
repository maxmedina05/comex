import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Home from './components/Home/HomePage';
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
		this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
		this.state = {
			isAuthenticated: false
		};
	}

	componentDidMount() {
		this.isUserAuthenticated();
	}

	async isUserAuthenticated() {
		try {
			const response = await axios.get('/api/v1/auth/user');
			const body = response.data;
			if (body.status === 'success') {
				console.log('user is authenticated');
				this.setState({
					isAuthenticated: true
				});
			}
		} catch (err) {
			this.setState({
				isAuthenticated: false
			});
		}
	}

	render() {
		return (
			<Router>
				<div>
					<Header isAuthenticated={this.state.isAuthenticated} />
					<hr />

					<Route exact path="/" component={Home} />
					<div className="container">
						<Route exact path="/signup" component={RegisterPage} />
						<Route exact path="/login" component={LoginPage} />
						<Route
							exact
							path="/users/:objectId/profile"
							component={UserProfilePage}
						/>
						<Route exact path="/admin/orders" component={OrderListPage} />
						<Route path="/admin/orders/:objectId" component={OrderEditPage} />
						<Route exact path="/admin/products" component={ProductListPage} />
						<Route exact path="/admin/menus" component={MenuListPage} />
						<Route
							path="/admin/products/:objectId"
							component={ProductEditPage}
						/>
						<Route path="/admin/menus/:objectId" component={MenuEditPage} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
