const mongoose = require('mongoose');
const Promise = require('bluebird');

const Questionnaire = require('../models/questionnaire');

const config = require('../config');

const util = require('../util/index');
const response = util.response;

// GET questionnaire
exports.getQuestionnaire = (req, res) => {
	return new Promise((resolve, reject) => {
		Questionnaire.findOne({graded: false}, '-marks1 -marks2 -marks3 -marks4 -marks5 -graded')
			.exec()
			.then(questionnaire => resolve(response(200, 'Questionnaire found', questionnaire)))
			.catch(err => reject(response(400, 'An error occured in finding th questionnaire', err)));
	});
}

// POST request to add a new questionnaire
exports.addQuestionnaire = (req, res) => {
	return new Promise((resolve, reject) => {
		newQ = new Questionnaire({
			question1: req.body.question1,
			question2: req.body.question2,
			question3: req.body.question3,
			question4: req.body.question4,
			question5: req.body.question5,
		});

		newQ.save()
			.then(() => resolve(response(200, "Successfully added questionnaire", newQ)))
			.catch(err => reject(response(400, "Something went wrong", err)));
	});
}

// POST request to grade the questionnaire
exports.gradeQuestionnare = (req, res) => {
	return new Promise((resolve, reject) => {
		
	});
}