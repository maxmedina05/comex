const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const { ObjectId } = mongoose.Types;
const makeResponseBody = require('./resources/response-body');
const User = require('./resources/user/user.schema');
const { UserInfoSchema } = require('./resources/user/user-info.schema');

router.post('/signup', async (req, res) => {
	const { email, password, firstName, lastName } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw Error('Email already being used!');
		}

		const user = new User({
			email,
			userInfo: UserInfoSchema,
			role: 'Customer'
		});

		user.userInfo.firstName = firstName;
		user.userInfo.lastName = lastName;
		const hashPassword = await user.generateHash(password);
		user.password = hashPassword;
		await user.save();

		req.login(user, err => {
			if (err) {
				throw Error(err.message || err);
			}
			res.json(
				makeResponseBody(
					'success',
					{
						objectId: user._id,
						email,
						role: user.role,
						userInfo: user.userInfo,
						fullName: user.getFullName()
					},
					'User created successfully!',
					1
				)
			);
		});
	} catch (err) {
		res
			// .status(422)
			.json(makeResponseBody('error', null, err.message || err, 0));
	}
});

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
		const { email, role, _id, userInfo } = req.user;
		res.json(
			makeResponseBody(
				'success',
				{
					objectId: _id,
					email,
					role,
					userInfo,
					fullName: req.user.getName()
				},
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
