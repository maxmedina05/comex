require('./order.schema');
const routes = require('./order.routes');

module.exports = (app, baseUrl) => {
	app.use(baseUrl + '/orders', routes);
};
