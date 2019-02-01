const graphql = require('graphql');
const User = require('../models/User');

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLInt,
} = graphql;

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLID },
		first_name: { type: GraphQLString },
		last_name: { type: GraphQLString },
		password: { type: GraphQLString },
		country: { type: GraphQLString },
		tel: { type: GraphQLString },
		sex: { type: GraphQLString },
		age: { type: GraphQLInt },
		wealth: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		//get user by id
		user: {
			type: UserType,
			id: { type: GraphQLID },
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				return User.findById(args.id);
			},
		},
		//get all users
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find({});
			},
		},
	}),
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		editUser: {
			type: UserType,
			args: {
				first_name: { type: GraphQLString },
				last_name: { type: GraphQLString },
				country: { type: GraphQLString },
				tel: { type: GraphQLString },
				age: { type: GraphQLInt },
				wealth: { type: GraphQLString },
			},
			resolve(parent, args) {
				let user = new User({
					first_name: args.first_name,
					last_name: args.last_name,
					country: args.country,
					tel: args.tel,
					password: args.password,
				});
				return user.save();
			},
		},
		newUser: {
			type: UserType,
			args: {
				first_name: { type: new GraphQLNonNull(GraphQLString) },
				tel: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
				sex: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				let user = new User({
					first_name: args.first_name,
					tel: args.tel,
					password: args.password,
					sex: args.sex,
				});
				return user.save();
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
