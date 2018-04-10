const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const makeResponseBody = require('../response-body');
const DailyMenu = mongoose.model('menus');

async function getAll(req, res) {
	try {
		const resources = await DailyMenu.find().populate('items.product');

		res.json(
			makeResponseBody(
				'success',
				resources,
				'Daily Menus retreived successfully!',
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
		const resource = await DailyMenu.findOne(ObjectId(objectId)).populate(
			'items.product'
		);
		if (!resource) {
			throw Error('Daily Menu not found!');
		}
		res.json(
			makeResponseBody(
				'success',
				resource,
				'Daily Menu retreived successfully!',
				1
			)
		);
	} catch (err) {
		res.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

async function getMenuAvailable(req, res) {
	const now = new Date();

	try {
		const resources = await DailyMenu.find({
			// endDate: { $gte: now }
		}).populate('items.product');
		if (!resources) {
			throw Error('Daily Menu not found!');
		}

		const resourcesWithLocalTime = resources.map(res => {
			return {
				...res._doc,
				serverStartDate: new Date(res.startDate.getTime() - res.offset * 60000),
				serverEndDate: new Date(res.endDate.getTime() - res.offset * 60000)
			};
		});

		res.json(
			makeResponseBody(
				'success',
				resourcesWithLocalTime[0],
				'Daily Menu retreived successfully!',
				resources.length
			)
		);
	} catch (err) {
		res.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

async function addOne(req, res) {
	const { items, startDate, endDate, discount } = req.body;

	const date = new Date(startDate);
	const offset = date.getTimezoneOffset();

	const resource = new DailyMenu({
		items,
		startDate,
		endDate,
		discount,
		offset
	});

	try {
		await resource.save();
		res.json(
			makeResponseBody(
				'success',
				resource,
				'Daily Menu created successfully!',
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
	const { items, startDate, endDate, discount, name } = req.body;

	try {
		const resource = await DailyMenu.findOne(ObjectId(objectId));
		resource.items = items;
		resource.startDate = startDate;
		resource.endDate = endDate;
		resource.discount = discount;
		resource.name = name;

		if (!resource.offset) {
			const date = new Date(startDate);
			const offset = date.getTimezoneOffset();
			resource.offset = offset;
		}

		await resource.save();
		res.json(
			makeResponseBody(
				'success',
				resource,
				'Daily Menu updated successfully!',
				1
			)
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
		const resource = await DailyMenu.findOne(ObjectId(objectId));
		await resource.remove();
		res.json(
			makeResponseBody(
				'success',
				resource,
				'Daily Menu removed successfully!',
				1
			)
		);
	} catch (err) {
		res
			.status(400)
			.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

router.get('/', getAll);
router.post('/', addOne);
router.get('/available', getMenuAvailable);
router.get('/:objectId', getOne);
router.put('/:objectId', updateOne);
router.delete('/:objectId', removeOne);

module.exports = router;
