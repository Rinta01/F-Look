const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApparelSchema = new Schema({
	article: {
		type: String,
		required: [true, 'An item must have an article'],
		unique: true,
	},
	brand: {
		type: Schema.Types.ObjectId,
		required: [true, 'An item must belong to a brand'],
		ref: 'Brand'
	},
	//Unisex!!!
	sex: {
		type: String,
		required: [true, 'An item must be for men/women or unisex'],
		validate: {
			validator: function(val) {
				return /Male|Female|Unisex/i.test(val);
			},
			message: props =>
				`${props.value} is not a valid property for this item!`,
		},
	},
	category: {
		type: String,
		required: [true, 'An item must have a category'],
	},
	//the most prevailed material
	material: {
		type: String,
	},
	image: {
		type: String,
		default: 'https://via.placeholder.com/150?text=Missing+item',
	}
});

const Apparel = mongoose.model('Apparel', ApparelSchema);

module.exports = Apparel;
