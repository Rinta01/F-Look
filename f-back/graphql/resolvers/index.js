const authResolver = require('./auth');
const usersResolver = require('./users');
const apparelResolver = require('./apparel');
const brandsResolver = require('./brands');

const rootResolver = {
	...authResolver,
	...usersResolver,
	...apparelResolver,
	...brandsResolver,
};

module.exports = rootResolver;
