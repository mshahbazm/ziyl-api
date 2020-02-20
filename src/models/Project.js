const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'),
	mongoSchema = mongoose.Schema;

const schema = new mongoSchema({
	title: {
		type: String,
		required: true
	},
	media: [String],
	external_link: String,
	isPublished: Boolean,
	description: String,
	tags: [mongoose.ObjectId],
	client: mongoose.ObjectId,
	website: mongoose.ObjectId
},{timestamps: true});

schema.plugin(uniqueValidator);
module.exports =  mongoose.model('Project',schema);
