require('dotenv').config();
const mongoose = require('mongoose');
require('./db')();
const express = require('express');
const verify =  require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
bcrypt = require('bcryptjs');
const {ApolloServer} = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
app.use(cors());
app.use(cookieParser());

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({req, res} ) => {
		const token = req.get('Authorization') ? req.get('Authorization').replace('Bearer ', '') : req.cookies['access-token'];
		if (token) {
			const decryptedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
			req.userId = decryptedToken.userId;
			req.websiteId = decryptedToken.websiteId;
		}
		return {
			req, res
		}
	}
});

server.applyMiddleware({ app });

mongoose.connection.on('connected', () => {
	app.listen({port: 4000}, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});

