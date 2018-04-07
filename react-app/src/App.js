import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/Home/HomePage';
import OrdersPage from './components/Orders/OrdersPage';
import ProductListPage from './components/Admin/Products/ProductListPage';
import ProductEditPage from './components/Admin/Products/ProductEditPage';
import MenuEditPage from './components/Admin/DailyMenu/MenuEditPage';
import RegisterPage from './components/Auth/RegisterPage';

class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<ul>
						<li>
							<Link to="/">Menu de Hoy</Link>
						</li>
						<li>
							<Link to="/orders">Ordenes</Link>
						</li>
						<li>
							<Link to="/admin/products">Products</Link>
						</li>
						<li>
							<Link to="/admin/menus">Menus</Link>
						</li>
						<li>
							<Link to="/register">Registrarse</Link>
						</li>
					</ul>

					<hr />

					<Route exact path="/" component={Home} />
					<div className="container">
						<Route path="/register" component={RegisterPage} />
						<Route path="/orders" component={OrdersPage} />
						<Route exact path="/admin/products" component={ProductListPage} />
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
