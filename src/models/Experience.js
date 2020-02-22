const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'),
	mongoSchema = mongoose.Schema;

const schema = new mongoSchema({
	company: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	start: {
		type: Date,
		required: true
	},
	end: Date,
	is_current: String,
	description: String,
	isPublished: Boolean,
	owner: [{ type: mongoose.ObjectId, ref: 'User' }]
},{timestamps: true});

schema.plugin(uniqueValidator);
module.exports =  mongoose.model('Experience',schema);
