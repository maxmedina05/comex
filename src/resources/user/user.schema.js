const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const { UserInfoSchema } = require('./user-info.schema');

const SALT_ROUNDS = 10;

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

UserSchema.methods.getFullName = function() {
	if (!this.userInfo) {
		return 'No Name';
	}
	return this.userInfo.firstName + ' ' + this.userInfo.lastName;
};

UserSchema.methods.generateHash = async password => {
	return await bcrypt.hash(password, SALT_ROUNDS);
};

UserSchema.methods.validatePassword = async function(password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
