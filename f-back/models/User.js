const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name: {
		type: String,
		required: 'User must have a first name.',
	},
	last_name: {
		type: String,
		required: 'User must have a last name.',
	},
	country: {
		type: String,
		required: 'User must be from a country.',
		default: 'Russia',
	},
	tel: {
		type: String,
		required: 'User must have a phone number.',
	},
	password: {
		type: String,
		required: 'User must have a password.',
	},
	created_date: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
