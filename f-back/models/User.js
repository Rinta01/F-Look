const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: {
		type: String,
		required: 'User must have a first name.',
	},
	last_name: {
		type: String,
	},
	country: {
		type: String,
		default: 'Russia',
	},
	tel: {
		type: String,
		required: 'User must have a phone number.',
		unique: true,
	},
	email: {
		type: String,
		unique: true,
		default: ''
	},
	password: {
		type: String,
		required: 'User must have a password.',
	},
	created_date: {
		type: Date,
		default: Date.now,
	},
	sex: {
		type: String,
		default: 'Other',
	},
	wealth: {
		type: String,
		default: 'Average',
	},
	age: {
		type: Number,
		default: 25,
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
