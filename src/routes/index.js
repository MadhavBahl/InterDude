const userRoutes = require('./userRoutes');
const questionnaireRoutes = require('./questionnaireRoutes');

// use these routes for testing
const test = require('./test');

module.exports = {
	// TODO add this to index.js
	'userRoutes': userRoutes,
	'questionnaireRoutes': questionnaireRoutes,
	'test': test
}