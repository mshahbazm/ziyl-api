const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'),
	mongoSchema = mongoose.Schema;

const schema = new mongoSchema({
	text: {
		type: String,
		required: true
	},
	reviewer: mongoose.ObjectId,
	isPublished: Boolean,
	website: mongoose.ObjectId
},{timestamps: true});

schema.plugin(uniqueValidator);
module.exports =  mongoose.model('Testimonial',schema);