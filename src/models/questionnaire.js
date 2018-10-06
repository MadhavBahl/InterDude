const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');

const questionnaireSchema = new Schema({
	question1: {
		type: String,
		required: true
	},

	question2: {
		type: String,
		required: true
	},

	question3: {
		type: String,
		required: true
	},

	question4: {
		type: String,
		required: true
	},

	question5: {
		type: String,
		required: true
	},

	marks1: {
		Type: Number,
		default: 0
	},

	marks2: {
		Type: Number,
		default: 0
	},

	marks3: {
		Type: Number,
		default: 0
	},

	marks4: {
		Type: Number,
		default: 0
	},

	marks5: {
		Type: Number,
		default: 0
	},

	graded: {
		type: Boolean,
		default: false
	}
});

questionnaireSchema.methods.setGradedTrue = () => {
	this.graded = true;
}

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;