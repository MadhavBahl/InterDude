const router = require('express').Router();

const questionnaireController = require('../controllers/index').questionnaireController;

router.get('/', (req, res) => {
	questionnaireController.getQuestionnaire(req, res)
		.then(info => res.status(info.code).json(info))
		.catch(err => res.status(err.code).json(err));
});

router.post('/add', (req, res) => {
	questionnaireController.addQuestionnaire(req, res)
		.then(info => res.status(info.code).json(info))
		.catch(err => res.status(err.code).json(err));
});

router.post('/grade', (req, res) => {
	questionnaireController.gradeQuestionnare(req, res)
		.then(info => res.status(info.code).json(info))
		.catch(err => res.status(err.code).json(err));
});

module.exports = router;