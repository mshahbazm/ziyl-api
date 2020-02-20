const mongoose = require('mongoose'),
	uniqueValidator = require('mongoose-unique-validator'),
	bcrypt = require('bcrypt-nodejs'),
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

UserSchema.methods.toJSON = function  () {
	var usr = this.toObject();
	delete usr.password;
	return usr;
};

UserSchema.pre('save',function (next) {
	var user = this;
	if(!user.isModified('password')) return next();
	bcrypt.genSalt(10,function (err, salt) {
		if (err) return next(err);
		bcrypt.hash(user.password,salt,null,function (err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

UserSchema.plugin(uniqueValidator);
module.exports =  mongoose.model('User',UserSchema);
