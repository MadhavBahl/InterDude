const router = require('express').Router();

const userController = require('../controllers/index').userController;

// TODO write auth middleware

// get all users
router.get('/', (req, res) => {
	userController.allUsers(req, res)
		.then(info => res.status(info.code).json(info))
		.catch(err => res.status(err.code).json(err));
});

router.post('/new', (req, res) => {
	userController.newUser(req, res)
		.then(info => res.status(info.code).json(info))
		.catch(err => res.status(err.code).json(err));
});

router.get('/:username', (req, res) => {
	userController.userDetails(req, res)
		.then(info => res.status(info.code).json(info))
		.catch(err => res.status(err.code).json(err));
});

router.post('/login', (req, res) => {
	// TODO add login controller
});

// secure this route
router.get('/update-rating', (req, res) => {
	// TODO update ratings
});

module.exports = router;