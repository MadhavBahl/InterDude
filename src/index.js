const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('hbs');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const dotenv = require('dotenv');

// Load local environment variables
dotenv.config();

const routes = require('./routes/index');

const config = require('./config');

const util = require('./util/index');

// socket part

io.on('connection', function(socket){
	console.log('a new connected');
	socket.on('disconnect', function(){
	  console.log('user disconnected');
	});

	io.emit('nextQues', 1);

	socket.on('update', msg => {
		console.log(msg);
		io.emit('nextQues', msg);
	});
});

// socket part ends

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

app.use('/api/users', routes.userRoutes);
app.use('/api/questionnaire', routes.questionnaireRoutes);
app.use('/api/interview', routes.interviewRoutes);

// socket
app.get('/socket', (req, res) => {
	io.emit('update', {
		counter: 1
	});
	res.end('Emitted');
});

util.db(() => {
	
});

http.listen(config.port, () => {
	console.log('Server running at port', config.port);
});

// For testing
module.exports = app;