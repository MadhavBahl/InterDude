const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},

	username: {
		type: String,
		required: true,
		unique: true
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true
	},

	rating: {
		type: Number,
		default: 0,
		required: true
	}
});

const User = mongoose.model('user', userSchema);

module.exports = User;