const router = require('express').Router();

const interviewController = require('../controllers/index').interviewController;

router.get('/', (req, res) => {

});

router.post('/new', (req, res) => {
	interviewController.newInterview(req, res)
		.then(info => res.status(info.code).json(info))
		.catch(err => res.status(err.code).json(err));
});

router.get('/update-questionnaire', (req, res) => {
	interviewController.updateQuestionnaire(req, res)
		.then(info => res.status(info.code).json(info))
		.catch(err => res.status(err.code).json(err));
});

module.exports = router;