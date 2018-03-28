import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import App from './App';
import './App.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<IntlProvider locale="en">
		<App />
	</IntlProvider>,
	document.getElementById('root')
);
registerServiceWorker();
