const DailyMenu = require('./daily-menu.schema');
const routes = require('./menu.routes');

module.exports = (app, baseUrl) => {
	app.use(baseUrl + '/menus', routes);
};
