const Apparel = require('../../models/Apparel');
const Brand = require('../../models/Brand');

module.exports = {
	addBrand: async ({ brandInput }) => {
		try {
			const existingBbrand = await Brand.findOne({
				brand: brandInput.name,
			});
			if (existingBbrand) {
				throw new Error('Brand exists already.');
			}
			let foundClothes = [];
			if (brandInput.clothes) {
				//find a more optimal way
				brandInput.clothes.forEach(async c => {
					const cloth = await Apparel.findOne({ article: c });
					foundBrands.push(cloth._id);
				});
			}
			const newBrand = new Brand({
				name: brandInput.name,
				clothes: foundClothes,
			});
			const savedBrand = await newBrand.save();
			return savedBrand;
		} catch (err) {
			throw err;
		}
	},
};
