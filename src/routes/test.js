const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('index.hbs');
});

router.get ('/login', (req, res) => {
	res.render('login.hbs');
})

router.get ('/signup', (req, res) => {
	res.render('signup.hbs');
})

module.exports = router;