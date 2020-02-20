const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'),
	mongoSchema = mongoose.Schema;

const schema = new mongoSchema({
	title: {
		type: String,
		required: true
	},
	domain: {
		type: String,
		index: true,
		unique: true,
		required: true
	},
	language: String,
	owner: mongoose.ObjectId
},{timestamps: true});

schema.plugin(uniqueValidator);
module.exports =  mongoose.model('Website', schema);