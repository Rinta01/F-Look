const bcrypt = require('bcryptjs');

const User = require('../../models/User');

module.exports = {
	findUser: async ({ id }) => {
		const user = await User.findById(id, (err, res) => {
			if (err) {
				console.log(err);
			} else if (!res) {
				throw new Error('User not found!');
			}
		});
		return user;
	},
	allUsers: async () => {
		const users = await User.find({});
		return users;
	},
	createUser: async ({ userInput }) => {
		try {
			console.log(...userInput);
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
			return savedUser;
			// return { ...savedUser._doc, password: null, id: savedUser.id };
		} catch (err) {
			throw err;
		}
	},
	editUser: async ({ editUserInput }) => {
		let user = new User({
			first_name: editUserInput.first_name,
			last_name: editUserInput.last_name,
			country: editUserInput.country,
			tel: editUserInput.tel,
			password: editUserInput.password,
		});
		const savedUser = await user.save();
		return savedUser;
	},
};
