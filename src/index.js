const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');

const dotenv = require('dotenv');

// Load local environment variables
dotenv.config();

const routes = require('./routes/index');

const config = require('./config');

const util = require('./util/index');

const app = express();
app.set('view engine', 'hbs');
app.set('views', path.normalize(__dirname + '/views'));

// app.engine('hbs', hbs({
//     defaultLayout: path.normalize(__dirname + '/views/layouts/mainLayout.hbs'),
//     layoutsDir: path.normalize(__dirname + '/views/layouts'),
//     partialsDir: path.normalize(__dirname + '/views/partials')
// }));



app.use('/', express.static(path.normalize(__dirname + '/public')));

app

if(config.enableCors) {
	app.use(util.cors);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes.test);

app.listen(config.port, () => {
	console.log('Server running at port', config.port);
});

// For testing
module.exports = app;