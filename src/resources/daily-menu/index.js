const DailyMenu = require('./daily-menu.schema');
const routes = require('./daily-menu.route');

module.exports = (app, baseUrl) => {
	app.use(baseUrl + '/menus', routes);
};
