const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const makeResponseBody = require('../response-body');

const User = require('./user.schema');

async function signup(req, res) {
	const { email, password } = req.body;

	try {
		const user = new User({
			email,
			role: 'Customer'
		});
		const hashPassword = await user.generateHash(password);
		user.password = hashPassword;

		await user.save();
		res.json(
			makeResponseBody('success', user, 'User created successfully!', 1)
		);
	} catch (err) {
		res
			.status(422)
			.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

router.post('/signup', signup);

module.exports = router;
