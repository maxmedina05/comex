const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 10;

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

const UserSchema = new Schema({
	email: String,
	password: String,
	role: String,
	createdAt: { type: Date, default: Date.now },
	modifiedAt: { type: Date, default: Date.now },
	offset: Number,
	userInfo: UserInfoSchema
});

// Role:
/*
	Customer,
	Administrator
*/

UserSchema.methods.generateHash = async password => {
	return await bcrypt.hash(password, SALT_ROUNDS);
};

UserSchema.methods.validatePassword = async function(password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('users', UserSchema);
