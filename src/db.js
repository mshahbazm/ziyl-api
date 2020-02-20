module.exports = () => {
	const mongoose = require('mongoose');
	const tunnel = require('tunnel-ssh');
	const sshConfig = require('./config/ssh');
	const mongoOpts = require('./config/mongo');
	const mongoURI = process.env.DB_URI;

	const sshTunnel = tunnel(sshConfig,  (err, server) => {
		if(!err){
			mongoose.connect(mongoURI, mongoOpts);
		}
	});

	sshTunnel.on('error', function(err){
		/*todo: email admin regarding ssh error*/
		console.error('Something bad happened with ssh tunnel: ', err);
	});
	mongoose.connection.on('error', (err)=>{
		/*todo: email admin regarding connection error*/
		console.log('handle mongo errored connections: ' + err);
	});

};
