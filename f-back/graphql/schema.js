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
		image: { type: GraphQLString },
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
			async resolve(parent, args) {
				const user = await User.findById(args.id, (err, res) => {
					if (err) {
						console.log(err);
					} else if (!res) {
						throw new Error('User not found!');
					}
				});
				return user;
			},
		},
		//get all users
		users: {
			type: new GraphQLList(UserType),
			async resolve(parent, args) {
				const users = await User.find({});
				return users;
			},
		},
		apparel: {
			type: ApparelType,
			id: { type: GraphQLID },
			args: { article: { type: GraphQLString } },
			async resolve(parent, args) {
				const item = await Apparel.findOne(
					{ article: args.article },
					(err, res) => {
						if (err) {
							console.log(err);
						} else if (!res) {
							throw new Error('Not found!');
						}
					}
				);
				return item;
			},
		},
		allApparel: {
			type: new GraphQLList(ApparelType),
			async resolve(parent, args) {
				const apparel = await Apparel.find({});
				return apparel;
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
			async resolve(parent, args) {
				let user = new User({
					first_name: args.first_name,
					last_name: args.last_name,
					country: args.country,
					tel: args.tel,
					password: args.password,
				});
				const savedUser = await user.save();
				return savedUser;
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
					const savedUser = await user.save();
					return savedUser;
				} catch (err) {
					throw err;
				}
			},
		},
		newApparel: {
			type: ApparelType,
			args: {
				article: { type: new GraphQLNonNull(GraphQLString) },
				brand: { type: new GraphQLNonNull(GraphQLString) },
				sex: { type: new GraphQLNonNull(GraphQLString) },
				category: { type: new GraphQLNonNull(GraphQLString) },
				material: { type: GraphQLString },
				image: { type: GraphQLString },
			},
			async resolve(parent, args) {
				try {
					const item = new Apparel({
						article: args.article,
						brand: args.brand,
						sex: args.sex,
						category: args.category,
						material: args.material,
						image: args.image,
					});
					const savedItem = await item.save();
					return savedItem;
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
