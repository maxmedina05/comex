const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
	companyName: { type: String, default: '' },
	department: { type: String, default: '' }
});

const AddressSchema = new Schema({
	address: { type: String, default: '' },
	city: { type: String, default: '' },
	state: { type: String, default: '' },
	reference: { type: String, default: '' }
});

const PersonSchema = new Schema({
	firstName: { type: String, default: '' },
	lastName: { type: String, default: '' },
	company: CompanySchema,
	address: AddressSchema,
	phone: { type: String, default: '' }
});

module.exports = {
	UserInfoSchema: PersonSchema,
	AddressSchema: AddressSchema,
	CompanySchema: CompanySchema
};
