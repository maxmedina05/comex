import 'bootstrap/dist/css/bootstrap.css';
import 'react-datetime/css/react-datetime.css';
import 'react-select/dist/react-select.css';

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
