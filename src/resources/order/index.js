require('./order.schema');
const routes = require('./order.route');

module.exports = (app, baseUrl) => {
	app.use(baseUrl + '/orders', routes);
};
