const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');

const User = require('../models/user');

const config = require('../config');

const util = require('../util/index');
const response = util.response;

// POST request to create a new user
exports.newUser = (req, res) => {
	return new Promise((resolve, reject) => {
		if(!req.body.password) {
			reject(response(403, 'No password', new Error('No password')));
		} else {
			bcrypt.hash(req.body.password, config.saltRounds)
				.then(hash => {
					const newUser = new User({
						name: req.body.name,
						username: req.body.username,
						password: hash,
						email: req.body.email,
						rating: 0
					});

					newUser.save()
						.then(() => {
							const user = new Object(newUser);
							user.password = undefined;
							resolve(response(200, 'Created new user!', user));
						})
						.catch(err => reject(response(400, 'Error in creating new user', err)));
				});
		}
	});
}

// GET request to get all users
exports.allUsers = (req, res) => {
	return new Promise((resolve, reject) => {
		// the '-password' arg removes password from the field
		User.find({}, '-password')
			.exec()
			.then(users => resolve(response(200, 'Found users!', users)))
			.catch(err => reject(response(500, 'Error in retrieving users', err)));
	});
}

// GET request to get details of a user
exports.userDetails = (req, res) => {
	return new Promise((resolve, reject) => {
		if (!req.params.username) {
			reject(response(400, 'Username not sent', new Error('Username not specified')));
		} else {
			// the '-password' arg removes password from the field
			User.findOne({username: req.params.username}, '-password')
				.exec()
				.then(user => resolve(response(200, 'Found user!', user)))
				.catch(err => reject(response(500, 'Error in retrrieving user', err)));
		}
	});
}

// POST request for login
exports.login = (req, res) => {
	// TODO login logic
}

// GET request to update the rating of the user