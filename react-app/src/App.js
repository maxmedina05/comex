import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './components/Home/HomePage';
import OrdersPage from './components/Orders/OrdersPage';

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
					</ul>

					<hr />
					<Route exact path="/" component={Home} />
					<Route path="/orders" component={OrdersPage} />
				</div>
			</Router>
		);
	}
}

export default App;
