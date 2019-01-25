const express = require('express');
const graphqlHTTP = require('express-graphql');

const PORT = 3001;
const app = express();

app.listen(PORT, () => {
	console.log(`Now listening on port ${PORT}`);
});
