const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name: String,
	category: String,
	price: Number,
	imageUrl: String
});

mongoose.model('products', ProductSchema);
