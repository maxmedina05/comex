import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-datetime/css/react-datetime.css';
import 'react-select/dist/react-select.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { IntlProvider } from 'react-intl';
import App from './App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

import { logger } from './middlewares/error-handler.middleware';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger));

ReactDOM.render(
	<Provider store={store}>
		<IntlProvider locale="en">
			<App />
		</IntlProvider>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
