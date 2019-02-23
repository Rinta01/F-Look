const bcrypt = require('bcryptjs');
const auth = require('./auth');
const User = require('../../models/User');

module.exports = {
	findUser: async ({ userId }) => {
		const user = await User.findById(userId, (err, user) => {
			if (err) {
				console.log(err);
			} else if (!user) {
				throw new Error('User not found!');
			}
		});
		return user;
	},
	allUsers: async (args, req) => {
		if (!req.isAuth) {
			throw new Error('Unauthenticated!');
		}
		const users = await User.find({});
		return users;
	},
	createUser: async ({ userInput }) => {
		try {
			const existingUser = await User.findOne({ tel: userInput.tel });
			if (existingUser) {
				throw new Error('User exists already.');
			}
			const hashedPassword = await bcrypt.hash(userInput.password, 12);
			const user = new User({
				first_name: userInput.first_name,
				tel: userInput.tel,
				password: hashedPassword,
				sex: userInput.sex,
			});
			const savedUser = await user.save();
			const loggedUser = await auth.login({
				tel: savedUser.tel,
				password: userInput.password,
			});
			console.log({ ...savedUser._doc, ...loggedUser });
			return { ...savedUser._doc, ...loggedUser };
		} catch (err) {
			throw err;
		}
	},
	editUser: async ({ editUserInput }) => {
		const user = await User.findById(
			editUserInput.id,
			async (err, foundUser) => {
				if (err) {
					console.log(err);
				} else if (!foundUser) {
					throw new Error('User not found!');
				} else {
					foundUser.first_name = editUserInput.first_name;
					foundUser.last_name = editUserInput.last_name;
					foundUser.country = editUserInput.country;
					foundUser.tel = editUserInput.tel;
					foundUser.email = editUserInput.email;
					foundUser.age = editUserInput.age;
					foundUser.wealth = editUserInput.wealth;
					foundUser.size = editUserInput.size;

					//find a more optimal way
					if (editUserInput.brands) {
						let foundBrands = [];
						editUserInput.brands.forEach(async b => {
							const brand = await Brand.findOne({ name: b });
							foundBrands.push(brand._id);
						});
						foundUser.favBrands = foundBrands;
					}

					if (editUserInput.wishlist) {
						let foundWishlist = [];
						foundUser.wishlist = foundWishlist;
					}

					await foundUser.save();
				}
			}
		);
		return user;
	},
};
