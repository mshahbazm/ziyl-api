require('dotenv').config();
import mongoose from 'mongoose';
const express = require('express');
import cors from 'cors';
import typeDefs from './schema';
import { ApolloServer } from 'apollo-server-express';
const app = express();

require('./db')();
app.use(cors());


// import rootResolver from './resolvers';


const server = new ApolloServer({ typeDefs });
server.applyMiddleware({ app });

mongoose.connection.on('connected', () =>{
	app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
});

