const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('react-app/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'react-app', 'build', 'index.html'));
	});
}

app.listen(PORT);
