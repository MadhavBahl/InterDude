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

router.get ('/home', (req, res) => {
	res.render('home.hbs');
})

router.get ('/inter', (req, res) => {
	res.render('interview.hbs');
})

router.get ('/client', (req, res) => {
	res.render('client.hbs');
})

module.exports = router;