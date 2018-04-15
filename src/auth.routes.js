const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const { ObjectId } = mongoose.Types;
const makeResponseBody = require('./resources/response-body');
const User = require('./resources/user/user.schema');
const { UserInfoSchema } = require('./resources/user/user-info.schema');

function login(req, res, next) {
	passport.authenticate('local', (err, user, info) => {
		try {
			if (err) {
				throw Error(err);
			}

			if (!user) {
				throw Error('Error al iniciar sessión');
			}

			const { _id, email, role, userInfo } = user;
			res.json({
				payload: {
					objectId: _id,
					email,
					role,
					userInfo,
					fullName: user.getFullName()
				},
				error: null
			});
		} catch (err) {
			res.status(401).json({
				payload: null,
				error: err.message || err
			});
		}
	})(req, res, next);
}

async function signup(req, res) {
	const { email, password, firstName, lastName } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw Error('Ya existe una cuenta con ese correo!');
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

		const { _id, role, userInfo } = user;

		req.login(user, err => {
			if (err) {
				throw Error(err);
			}
			res.json({
				payload: {
					objectId: _id,
					email,
					role,
					userInfo,
					fullName: user.getFullName()
				}
			});
		});
	} catch (err) {
		res.status(400).json({
			payload: null,
			error: err.message || err
		});
	}
}

router.get('/user', (req, res) => {
	if (!req.user) {
		res.status(401).json({
			payload: null,
			error: 'Usuario no está autenticado!'
		});
	} else {
		const { email, role, _id, userInfo } = req.user;
		res.json({
			payload: {
				objectId: _id,
				email,
				role,
				userInfo,
				fullName: req.user.getFullName()
			}
		});
	}
});

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
