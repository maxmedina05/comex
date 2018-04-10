const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuItem = new Schema({
	product: { type: Schema.Types.ObjectId, ref: 'products' },
	discount: { type: Number, default: 0 }
});

const MenuSchema = new Schema({
	items: [MenuItem],
	startDate: { type: Date, default: Date.now },
	endDate: { type: Date, default: Date.now },
	closeTime: String,
	offset: Number,
	name: String
});

mongoose.model('menus', MenuSchema);
