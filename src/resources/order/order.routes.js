const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const makeResponseBody = require('../response-body');
const Order = mongoose.model('orders');

async function getAll(req, res) {
	try {
		const resources = await Order.find().populate('items.product');

		res.json(
			makeResponseBody(
				'success',
				resources,
				'Orders retreived successfully!',
				resources.length
			)
		);
	} catch (err) {
		res.json(makeResponseBody('error', null, err.message | err, 0));
	}
}

async function getOne(req, res) {
	const objectId = req.params.objectId;

	try {
		let resource = await Order.findOne(ObjectId(objectId))
			.populate('items.product')
			.populate('user');
		resource.user = {
			email: resource.user.email,
			userInfo: resource.user.userInfo
		};
		if (!resource) {
			throw Error('Order not found!');
		}
		res.json(
			makeResponseBody('success', resource, 'Order retreived successfully!', 1)
		);
	} catch (err) {
		res.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

async function addOne(req, res) {
	const { items, shippingAddress, createdAt, message } = req.body;

	const date = new Date(createdAt);
	const offset = date.getTimezoneOffset();

	const order = new Order({
		items,
		createdAt,
		offset,
		message,
		shippingAddress,
		user: req.user._id,
		modifiedAt: createdAt,
		status: 'Aun no procesada'
	});
	try {
		await order.save();

		let createdOrder = {
			_id: order._id,
			totalPrice: order.computeTotalPrice(),
			items,
			createdAt,
			shippingAddress,
			customerName: req.user.getFullName(),
			message
		};

		res.json(
			makeResponseBody(
				'success',
				createdOrder,
				'Order created successfully!',
				1
			)
		);
	} catch (err) {
		res
			.status(422)
			.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

async function updateOne(req, res) {
	const objectId = req.params.objectId;
	const { items, modifiedAt, customer, status, deliveryBoy } = req.body;

	try {
		const resource = await Order.findOne(ObjectId(objectId));
		// resource.items = items;
		resource.modifiedAt = modifiedAt;
		// resource.customer = customer;
		resource.status = status;
		// resource.deliveryBoy = deliveryBoy;
		await resource.save();

		res.json(
			makeResponseBody('success', resource, 'Order updated successfully!', 1)
		);
	} catch (err) {
		res
			.status(400)
			.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

async function removeOne(req, res) {
	const objectId = req.params.objectId;

	try {
		const resource = await Order.findOne(ObjectId(objectId));
		await resource.remove();
		res.json(
			makeResponseBody('success', resource, 'Order removed successfully!', 1)
		);
	} catch (err) {
		res
			.status(400)
			.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

router.get('/', getAll);
router.post('/', addOne);
router.get('/:objectId', getOne);
router.put('/:objectId', updateOne);
router.delete('/:objectId', removeOne);

module.exports = router;
