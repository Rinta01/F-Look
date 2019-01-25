const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const PORT = 4000;
const app = express();
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/f-look');
mongoose.Promise = Promise;
mongoose.connection.once('open', () => {
	console.log('Successfully connected to MongoDB!');
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(PORT, () => {
	console.log(`Now listening on port ${PORT}`);
});
