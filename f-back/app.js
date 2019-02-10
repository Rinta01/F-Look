const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const isAuth = require('./middleware/is-auth');
const rootValue = require('./graphql/resolvers/index');
const { CORS, optionsHandler } = require('./middleware/cors');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());

app.use(CORS, optionsHandler);
app.use(isAuth);
app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }));
app.use(express.static('public'));

// app.get('*', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connection.once('open', () => {
	console.log('Successfully connected to MongoDB!');
});
mongoose
	.connect('mongodb://localhost/f-look')
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Now listening on port ${PORT}`);
		});
	})
	.catch(err => {
		console.log(err);
	});
