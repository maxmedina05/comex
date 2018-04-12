const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { AddressSchema } = require('../user/user-info.schema');

const OrderItem = new Schema({
	product: { type: Schema.Types.ObjectId, ref: 'products' },
	qty: { type: Number, default: 0 },
	discount: { type: Number, default: 0 },
	unitPrice: { type: Number, default: 0 }
});

const OrderSchema = new Schema({
	items: [OrderItem],
	user: { type: Schema.Types.ObjectId, ref: 'users' },
	shippingAddress: AddressSchema,
	totalPrice: { type: Number, default: 0 },
	status: { type: String, default: 'Aun no procesada' },
	message: { type: String, default: '' },
	createdAt: { type: Date, default: Date.now },
	modifiedAt: { type: Date, default: Date.now },
	offset: Number
});

// status
/*
  Awaiting,
  Processing,
  Dispatched,
  Delivered
*/
OrderSchema.methods.computeTotalPrice = function() {
	let total = 0;
	for (const item of this.items) {
		total += Math.abs(item.unitPrice - item.discount) * item.qty;
	}
	return total;
};

mongoose.model('orders', OrderSchema);
