const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
	companyName: String,
	department: String
});

const AddressSchema = new Schema({
	address: String,
	city: String,
	state: String,
	reference: String
});

const UserInfoSchema = new Schema({
	firstName: String,
	lastName: String,
	company: CompanySchema,
	address: AddressSchema,
	phone: String
});

module.exports = {
	UserInfoSchema: UserInfoSchema,
	AddressSchema: AddressSchema,
	CompanySchema: CompanySchema
};
