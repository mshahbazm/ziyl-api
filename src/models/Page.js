const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'),
	mongoSchema = mongoose.Schema;

const schema = new mongoSchema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		unique: true,
		required: true
	},
	language: String,
	markdown: String,
	html: String,
	isPublished: Boolean,
	meta_title: String,
	meta_description: String,
	website: mongoose.ObjectId
},{timestamps: true});

schema.plugin(uniqueValidator);
schema.index( { website: 1, slug: 1 }, { unique: true, sparse: true } );
module.exports =  mongoose.model('Page',schema);
