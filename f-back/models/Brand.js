const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
	name: {
		type: String,
		required: [true, 'A brand must have a name'],
		unique: true,
	},
	clothes: {
		type: Schema.Types.ObjectId,
	}
});

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand;
