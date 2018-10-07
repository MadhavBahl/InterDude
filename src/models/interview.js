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
		default: false,
		required: true
	},

	completed: {
		type: Boolean,
		default: false,
		required: true
	},

	// questionnaire of the first user
	questionnaireOne: {
		type: Schema.Types.ObjectId,
		ref: 'Questionnaire',
		default: null
	},

	// questionnaire of the second user
	questionnaireTwo: {
		type: Schema.Types.ObjectId,
		ref: 'Questionnaire',
		default: null
	}

});

interviewSchema.methods.setUserTwo = (userId) => {
	return new Promise((resolve, reject) => {
		User.findById(userId)
		.exec()
		.then(function(user) {
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

interviewSchema.methods.setQuestionnaire = function(questionnaireNo, questionnaireId) {
	let self = this;
	return new Promise((resolve, reject) => {
		Questionnaire.findById(questionnaireId)
		.exec()
		.then(function (questionnaire) {
			if(parseInt(questionnaireNo) == 1) {
				self.questionnaireOne = questionnaire._id;
			} else if (parseInt(questionnaireNo) == 2) {
				self.questionnaireTwo = questionnaire._id;
			} else {
				reject({
					message: 'Questionnaire no. should be 1 or 2'
				});
			}
			if (self.questionnaireOne && self.questionnaireTwo) self.completed = true;
			self.save()
				.then(() => resolve({
					message: 'Successfully updated the questionnaire',
					questionnaireId: questionnaire._id
				}))
				.catch(err => reject(err));
		})
		.catch(err => reject(err));
	});
}

// TODO add topic and level to query
interviewSchema.methods.attemptToSchedule = function(time) {
	const self = this;
	return new Promise((resolve, reject) => {
		this.model('Interview').findOne({time: time})
		.exec()
		.then(interview => {
			if(!interview) resolve({
				message: "No interview found with the given time slot. Try again later",
				scheduled: false
			});
			else {
				resolve({
					message: 'Successfully found user 2',
					userTwo: interview.userOne,
					id: interview._id,
					scheduled: true
				});
			}
		})
	});
}

interviewSchema.pre('save', function(next) {
	return this.attemptToSchedule(this.time)
		.then(info => {
			this.userTwo = info.userTwo
			this.scheduled = info.scheduled;
			// this.model('Interview')
			// 	.deleteOne({_id: info.id})
			// 	.exec()
			// 	.then(() => next(null))
			// 	.catch(err => next(err));
		})
		.catch(err => next(err));
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;