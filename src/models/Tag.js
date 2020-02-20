const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'),
	mongoSchema = mongoose.Schema;

const schema = new mongoSchema({
	title: {
		type: String,
		required: true
	},
	website: mongoose.ObjectId
},{timestamps: true});

schema.plugin(uniqueValidator);
module.exports =  mongoose.model('Tag',schema);