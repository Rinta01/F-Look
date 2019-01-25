const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 4000;
const app = express();

app.use(cors());
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/f-look');
mongoose.Promise = Promise;
mongoose.connection.once('open', () => {
	console.log('Successfully connected to MongoDB!');
});


app.listen(PORT, () => {
	console.log(`Now listening on port ${PORT}`);
});
