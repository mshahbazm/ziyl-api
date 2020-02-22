const mongoose = require('mongoose'),
	uniqueValidator = require('mongoose-unique-validator'),
	bcrypt = require('bcryptjs'),
	Schema = mongoose.Schema;

const UserSchema = new Schema({
	first_name : {type: String,maxlength:90},
	last_name : {type: String,maxlength:90},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		index: true,
		unique: true,
		required: true
	},
	image: String,
	phone: String,
	city: String,
	bio: String,
	country: String
},{timestamps: true});


UserSchema.pre('save', async  (next) => {
	const user = this;
	if(!user.isModified('password')) return next();
	user.password = await bcrypt.hash(user.password, 10);
	next();
});

UserSchema.plugin(uniqueValidator);
module.exports =  mongoose.model('User',UserSchema);
