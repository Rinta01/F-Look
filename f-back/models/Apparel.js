const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApparelSchema = new Schema({
	article: {
		type: Number,
		required: [true, 'An item must have an article'],
		unique: true,
	},
	brand: {
		type: String,
		required: [true, 'An item must belong to a brand'],
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
});

const Apparel = mongoose.model('Apparel', ApparelSchema);

module.exports = Apparel;
