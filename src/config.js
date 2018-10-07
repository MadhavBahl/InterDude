const config = {
	enableCors: true,
	port: process.env.PORT || 8080,
	db_url: 'mongodb://admin:interdude1@ds217002.mlab.com:17002/interdude',
	saltRounds: 10
}

module.exports = config;