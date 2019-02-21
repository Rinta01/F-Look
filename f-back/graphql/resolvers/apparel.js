const Apparel = require('../../models/Apparel');
const Brand = require('../../models/Brand');
const brandResolvers = require('../resolvers/brands');

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
	addApparel: async ({ apparelInput }) => {
		console.log('here')
		const findBrand = async () =>
			await Brand.findOne({ name: apparelInput.brand });

		try {
			const existingApparel = await Apparel.findOne({
				article: apparelInput.article,
			});
			if (existingApparel) {
				throw new Error('Item exists already.');
			}
			let foundBrand;
			foundBrand = findBrand();
			if (!foundBrand) {
				await brandResolvers.addBrand({
					brandInput: { name: apparelInput.brand },
				});
				foundBrand = findBrand();
				
			}
			console.log(foundBrand);
			const item = new Apparel({
				article: apparelInput.article,
				brand: foundBrand,
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
