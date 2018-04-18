const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const makeResponseBody = require('../response-body');
const Product = mongoose.model('Product');

async function getAll(req, res) {
	try {
		const products = await Product.find();
		res.json({
			payload: products,
			count: products.length,
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
		const product = await Product.findOne(ObjectId(objectId));
		if (!product) {
			throw Error('Product not found!');
		}
		res.json(
			makeResponseBody('success', product, 'Product retreived successfully!', 1)
		);
	} catch (err) {
		res.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

async function addOne(req, res) {
	const { name, price, category } = req.body;

	const product = new Product({
		name,
		price,
		category
	});

	try {
		await product.save();
		res.json(
			makeResponseBody('success', product, 'Product created successfully!', 1)
		);
	} catch (err) {
		res
			.status(422)
			.json(makeResponseBody('error', null, err.message || err, 0));
	}
}

async function updateOne(req, res) {
	const objectId = req.params.objectId;
	const { name, price, category, imageUrl } = req.body;

	try {
		const product = await Product.findOne(ObjectId(objectId));
		product.name = name;
		product.price = price;
		product.category = category;
		product.imageUrl = imageUrl;

		await product.save();
		res.json(
			makeResponseBody('success', product, 'Product updated successfully!', 1)
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
		const product = await Product.findOne(ObjectId(objectId));
		await product.remove();
		res.json(
			makeResponseBody('success', product, 'Product removed successfully!', 1)
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
