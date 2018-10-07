const userRoutes = require('./userRoutes');
const questionnaireRoutes = require('./questionnaireRoutes');
const interviewRoutes = require('./interviewRoutes');

// use these routes for testing
const test = require('./test');

module.exports = {
	// TODO add this to index.js
	'userRoutes': userRoutes,
	'questionnaireRoutes': questionnaireRoutes,
	'interviewRoutes': interviewRoutes,
	'test': test
}