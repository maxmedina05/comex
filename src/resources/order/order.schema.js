const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { AddressSchema } = require('../user/user-info.schema');

const OrderItem = new Schema({
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	quantity: { type: Number, default: 0 },
	discount: { type: Number, default: 0 },
	unitPrice: { type: Number, default: 0 }
});

const OrderSchema = new Schema({
	items: [OrderItem],
	totalPrice: { type: Number, default: 0 },
	shippingAddress: AddressSchema,
	message: { type: String, default: '' },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	createdAt: { type: Date, default: Date.now },
	modifiedAt: { type: Date, default: Date.now },
	offset: Number,
	status: { type: String, default: '' }
});

mongoose.model('Order', OrderSchema);
