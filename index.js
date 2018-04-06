require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const loadProductResource = require('./src/resources/product/index');
const loadDailyMenuResource = require('./src/resources/daily-menu/index');
const loadOrderResource = require('./src/resources/order/index');

const app = express();

app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI);

loadProductResource(app, '/api/v1');
loadDailyMenuResource(app, '/api/v1');
loadOrderResource(app, '/api/v1');

app.use('/', (req, res) => {
	res.send('Comex is Alive');
});

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('react-app/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'react-app', 'build', 'index.html'));
	});
}
app.listen(PORT);
