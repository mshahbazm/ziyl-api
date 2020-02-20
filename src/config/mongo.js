module.exports = {
	user:process.env.DB_USERNAME,
	pass:process.env.DB_PASSWORD,
	keepAlive: true,
	keepAliveInitialDelay: 300000,
	useNewUrlParser: true,
	useUnifiedTopology: true
}
