const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const { ObjectId } = mongoose.Types;
const makeResponseBody = require('./resources/response-body');

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		try {
			if (err) {
				throw Error(err.message || err);
			}

			if (!user) {
				throw Error('Authentication failed!');
			}

			req.login(user, loginErr => {
				if (loginErr) {
					throw Error(err.message || err);
				}
				const { email, role, _id } = user;
				res.json(
					makeResponseBody(
						'success',
						{ objectId: _id, email, role, name: user.getName() },
						'Logged in successfully!',
						1
					)
				);
			});
		} catch (err) {
			res.json(makeResponseBody('error', null, err.message || err, 0));
		}
	})(req, res, next);
});

router.get('/user', (req, res) => {
	if (!req.user) {
		res.json(makeResponseBody('error', null, 'User is not authenticated!', 0));
	} else {
		const { email, role, _id } = req.user;
		res.json(
			makeResponseBody(
				'success',
				{ objectId: _id, email, role, name: req.user.getName() },
				'User is authenticated!',
				1
			)
		);
	}
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
