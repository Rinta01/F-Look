const Apparel = require('../../models/Apparel');

module.exports = {
	findApparel: async ({ itemArticle }) => {
		const item = await Apparel.findOne(
			{ article: itemArticle },
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
	allApparel: async () => {
		const apparel = await Apparel.find({});
		return apparel;
	},
	createApparel: async ({ apparelInput }) => {
		try {
			const existingApparel = await User.findOne({
				article: apparelInput.article,
			});
			if (existingUser) {
				throw new Error('Item exists already.');
			}
			const item = new Apparel({
				article: apparelInput.article,
				brand: apparelInput.brand,
				sex: apparelInput.sex,
				category: apparelInput.category,
				material: apparelInput.material,
				image: apparelInput.image,
			});
			const savedItem = await item.save();
			return savedItem;
		} catch (err) {
			throw err;
		}
	},
};
