const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const makeResponseBody = require('../response-body');

const User = require('./user.schema');

async function signup(req, res) {
	const { email, password, firstName, lastName } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw Error('Email already being used!');
		}

		const user = new User({
			email,
			userInfo: {
				firstName,
				lastName
			},
			role: 'Customer'
		});
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
					{ ...user, name: user.getName() },
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
}

async function getOne(req, res) {
	const objectId = req.params.objectId;
	try {
		const user = await User.findOne(ObjectId(objectId));
		if (!user) {
			throw Error('User not found!');
		}
		res.json(
			makeResponseBody('success', user, 'User retreived successfully!', 1)
		);
	} catch (err) {
		res.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

async function updateOne(req, res) {
	const objectId = req.params.objectId;
	const { firstName, lastName, companyInfo, address, phone } = req.body;

	try {
		const user = await User.findOne(ObjectId(objectId));
		if (!user.userInfo) {
			user.userInfo = {};
		}

		user.userInfo.firstName = firstName;
		user.userInfo.lastName = lastName;
		user.userInfo.companyInfo = companyInfo;
		user.userInfo.address = address;
		user.userInfo.phone = phone;
		await user.save();

		if (!user) {
			throw Error('User not found!');
		}
		res.json(
			makeResponseBody('success', user, 'User updated successfully!', 1)
		);
	} catch (err) {
		res.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

router.post('/signup', signup);
router.get('/:objectId', getOne);
router.put('/:objectId', updateOne);

module.exports = router;
