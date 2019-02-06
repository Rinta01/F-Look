const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
// { credentials: true 
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
app.use(express.static('public'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

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
