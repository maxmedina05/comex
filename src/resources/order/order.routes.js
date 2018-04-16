const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const makeResponseBody = require('../response-body');
const OrderMessages = require('./order.messages');
const { computeTotalPrice } = require('./order.service');
const Order = mongoose.model('Order');

async function getAll(req, res) {
	const { userId } = req.query;

	try {
		const resources = await Order.find({ user: ObjectId(userId) }).populate(
			'items.product'
		);

		res.json({
			payload: resources,
			count: resources.length,
			error: null
		});
	} catch (err) {
		res.status(400).json({
			payload: null,
			error: err.message || err,
			count: 0
		});
	}
}

async function getOne(req, res) {
	const objectId = req.params.objectId;

	try {
		let order = await Order.findOne(ObjectId(objectId))
			.populate('items.product')
			.populate('user');

		if (!order) {
			throw OrderMessages.ORDER_NOT_FOUND;
		}

		res.json({
			payload: order,
			count: 1
		});
	} catch (err) {
		res.status(400).json({
			payload: null,
			error: err
		});
	}
}

async function addOne(req, res) {
	const { items, shippingAddress, message } = req.body;

	const now = new Date();
	const offset = now.getTimezoneOffset();
	const totalPrice = computeTotalPrice(items);

	const order = new Order({
		items,
		totalPrice,
		shippingAddress,
		message,
		user: req.user._id,
		createdAt: now,
		modifiedAt: now,
		offset
	});

	try {
		await order.save();

		let createdOrder = {
			objectId: order._id,
			items,
			totalPrice: order.totalPrice,
			shippingAddress: order.shippingAddress,
			message,
			createdAt: order.createdAt,
			customerName: req.user.getFullName()
		};

		res.status(201).json({
			payload: createdOrder,
			error: null,
			count: 1
		});
	} catch (err) {
		res.status(400).json({
			payload: null,
			error: err.message || err
		});
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
