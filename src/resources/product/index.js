const Product = require('./product.schema');
const routes = require('./product.routes');

module.exports = (app, baseUrl) => {
	app.use(baseUrl + '/products', routes);
};
