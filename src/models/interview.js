const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Promise = require('bluebird');

const User = require('./user');
const Questionnaire = require('./questionnaire');

const interviewSchema = new Schema({
	topic: {
		type: String,
		required: true
	},

	level: {
		type: String,
		required: true,
		enum: ['easy', 'medium', 'pro']
	},

	date: {
		type: Date,
		required: true
	},

	time: {
		type: String,
		required: true
	},

	userOne: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},

	userTwo: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

	scheduled: {
		type: Boolean,
		default: false
	},

	completed: {
		type: Boolean,
		default: false
	},

	// questionnaire of the first user
	questionnaireOne: {
		type: Schema.Types.ObjectId,
		ref: 'Questionnaire'
	},

	// questionnaire of the second user
	questionnaireTwo: {
		type: Schema.Types.ObjectId,
		ref: 'Questionnaire'
	}

});

interviewSchema.methods.setUserTwo = (userId) => {
	return new Promise((resolve, reject) => {
		User.findById(userId)
		.exec()
		.then(user => {
			this.userTwo = user._id;
			this.setCompletedTrue();
			resolve({
				message: 'Successfully updated the 2nd user',
				userId: user._id
			});
		})
		.catch(err => reject(err));
	});
}

interviewSchema.methods.setCompletedTrue = () => {
	this.completed = true;
}

interviewSchema.methods.setScheduledTrue = () => {
	this.scheduled = true;
}

interviewSchema.methods.setQuestionnaire = (questionnaireNo, questionnaireId) => {
	return new Promise((resolve, reject) => {
		Questionnaire.findById(questionnaireId)
		.exec()
		.then(questionnaire => {
			if(questionnaireNo == 1) {
				this.questionnaireOne = questionnaire._id;
			} else if (questionnaireNo == 2) {
				this.questionnaireTwo = questionnaire._id;
			}
			resolve({
				message: 'Successfully updated the questionnaire',
				questionnaireId: questionnaire._id
			});
		})
		.catch(err => reject(err));
	});
}

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;