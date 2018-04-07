const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const { ObjectId } = mongoose.Types;
const makeResponseBody = require('./resources/response-body');

router.post('/login', passport.authenticate('local'), (req, res) => {
	const { email } = req.user;
	res.json(
		makeResponseBody('success', { email }, 'Logged in successfully!', 1)
	);
});

router.get('/user', (req, res) => {
	if (!req.user) {
		res.json(makeResponseBody('error', null, 'User is not authenticated!', 0));
	} else {
		const { email } = req.user;
		res.json(
			makeResponseBody('success', { email }, 'User is authenticated!', 1)
		);
	}
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;