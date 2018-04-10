require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./src/services/passport.service');

const loadProductResource = require('./src/resources/product/index');
const loadDailyMenuResource = require('./src/resources/menu/index');
const loadOrderResource = require('./src/resources/order/index');
const loadUserResource = require('./src/resources/user/index');
const RequireLogin = require('./src/middlewares/require-login');

const app = express();
mongoose.connect(process.env.MONGO_URI);
app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true });
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [process.env.COOKIE_KEY]
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', require('./src/auth.routes'));
loadDailyMenuResource(app, '/api/v1');
// app.use(RequireLogin);

loadUserResource(app, '/api/v1');
loadProductResource(app, '/api/v1');
loadOrderResource(app, '/api/v1');

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}
app.listen(PORT);
