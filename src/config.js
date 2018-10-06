const config = {
	enableCors: true,
	port: process.env.PORT || 8000,
	db_url: 'mongodb://127.0.0.1:27017/interdude',
	saltRounds: 10
}

module.exports = config;