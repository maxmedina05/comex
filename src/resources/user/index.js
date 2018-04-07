require('./user.schema');

module.exports = (app, baseUrl) => {
	app.use(baseUrl + '/users', require('./user.routes'));
};
