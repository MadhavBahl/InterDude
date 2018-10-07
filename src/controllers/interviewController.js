const mongoose = require('mongoose');
const Promise = require('bluebird');

const Interview = require('../models/interview');

const config = require('../config');

const util = require('../util/index');
const response = util.response;

// POST request to create a new interview
exports.newInterview = (req, res) => {
	return new Promise((resolve, reject) => {
		const newInt = new Interview({
			topic: req.body.topic,
			level: req.body.level,
			date: new Date(req.body.date),
			time: req.body.time,
			userOne: req.body.userOne
		});

		newInt.save()
			.then(() => resolve(response(200, "Successfully created a new interview, which currently is not scheduled.", newInt)))
			.catch(err => {
				console.log(err);
				reject(response(400, "Something went wrong", err))
			});
	});
}

exports.updateQuestionnaire = (req, res) => {
	return new Promise((resolve, reject) => {
		if(!req.query.qnno || !req.query.qnid || !req.query.intid) reject(response(400, "Questionnaire no., questionnaire ID missing or interview ID missing", new Error("Questionnaire no., questionnaire ID missing or interview ID missing")));
		else {
			Interview.findOne({_id: req.query.intid})
				.exec()
				.then(interview => {
					if(!interview) reject(response(400, "Interview with given ID not found", new Error("Interview with given ID not found")));
					else {
						// TODO add all params to response
						interview.setQuestionnaire(req.query.qnno, req.query.qnid)
							.then(info => resolve(response(200, "Questionnaire updated successfully", info)))
							.catch(err => {
								console.log(err);
								reject(response(400, "Something went wrong", err))
							});
					}
				})
				.catch(err => {
					console.log(err);
					reject(response(400, "Something went wrong", err))
				});
		}
	});
}

// GET request to get interview details
exports.interviewDetails = (req, res) => {
	return new Promise((resolve, reject) => {
		if(!req.params.id) reject(response(400, "ID field not provided", new Error("ID field not provided")));
		else {
			Interview.findOne({_id: req.params.id})
				.exec()
				.then(interview => resolve(response(200, "Found interview", interview)))
				.catch(err => reject(response(400, "Something went wrong", err)));
		}
	});
}