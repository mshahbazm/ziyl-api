const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'),
	mongoSchema = mongoose.Schema;

const schema = new mongoSchema({
	institute: {
		type: String,
		required: true
	},
	start_year: String,
	end_year: String,
	degree: String,
	description: String,
	isPublished: Boolean,
	owner: mongoose.ObjectId
},{timestamps: true});

schema.plugin(uniqueValidator);
module.exports =  mongoose.model('Education',schema);
