const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'),
	mongoSchema = mongoose.Schema;

const schema = new mongoSchema({
	name: {
		type: String,
		required: true
	},
	email: String,
	company: String,
	isPublished: Boolean,
	website: mongoose.ObjectId
},{timestamps: true});

schema.plugin(uniqueValidator);
module.exports =  mongoose.model('Client',schema);