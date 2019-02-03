const graphql = require('graphql');
const User = require('../models/User');
const Apparel = require('../models/Apparel');
const bcrypt = require('bcryptjs');

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

const ApparelType = new GraphQLObjectType({
	name: 'Apparel',
	fields: () => ({
		id: { type: GraphQLID },
		article: { type: GraphQLString },
		brand: { type: GraphQLString },
		sex: { type: GraphQLString },
		category: { type: GraphQLString },
		material: { type: GraphQLString },
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
		apparel: {
			type: ApparelType,
			id: { type: GraphQLID },
			args: { article: { type: GraphQLString } },
			resolve(parent, args) {
				return Apparel.findOne(
					{ article: args.article },
					(err, res) => {
						if (err) {
							return console.log(err);
						}
					}
				);
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
			async resolve(parent, args) {
				try {
					const hashedPassword = await bcrypt.hash(args.password, 12);
					const user = new User({
						first_name: args.first_name,
						tel: args.tel,
						password: hashedPassword,
						sex: args.sex,
					});
					return user.save();
				} catch (err) {
					throw err;
				}
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
