const Product = require('./product.schema');
const routes = require('./product.route');

module.exports = (app, baseUrl) => {
	app.use(baseUrl + '/products', routes);
};
