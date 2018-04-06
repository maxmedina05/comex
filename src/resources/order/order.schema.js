const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItem = new Schema({
	product: { type: Schema.Types.ObjectId, ref: 'products' },
	qty: { type: Number, default: 0 }
});

const OrderSchema = new Schema({
	items: [OrderItem],
	createdAt: { type: Date, default: Date.now },
	modifiedAt: { type: Date, default: Date.now },
	offset: Number,
	status: String,
	customer: String,
	deliveryBoy: String
});

// status
/*
  Awaiting,
  Processing,
  Dispatched,
  Delivered
*/

mongoose.model('orders', OrderSchema);
