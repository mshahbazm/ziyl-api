const User = require('./models/User');
const Website = require('./models/Website');
const Client = require('./models/Client');
const Page = require('./models/Page');
const Project = require('./models/Project');
const Testimonial = require('./models/Testimonial');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Tag = require('./models/Tag');
const bcrypt = require('bcryptjs');
const sign = require('jsonwebtoken/sign');

module.exports = {
	UserResponse: {
		websites: (parent, args, ctx) => {
			return  Website.find({}).where('owner').equals(parent._id);
		}
	},
	Query: {
		me: async (_, __, {req}) => {
			if(req.userId) {
				return User.findById(userId);
			} else{
				throw new Error("Authentication Failed");
			}
		},
		websites: async (_, __, {req}) => {
			if(req.userId) {
				return  Website.find({}).where('owner').equals(req.userId);
			} else{
				throw new Error("Authentication Failed");
			}
		},
		education: async (_, __, {req}) => {
			return Education.find({}).where('website').equals(req.websiteId);
		},
		experience: async (_, __, {req}) => {
			if(req.userId) {
				return Education.find({}).where('website').equals(req.websiteId);
			}
		},
		user: async (_, args) => {
			return User.findById(args._id);
		},
		website: async (_, args, ctx) => {
			return  Website.findById(args._id);
		},
		project: async (_, args, ctx) => {
			return  Project.findById(args._id);
		},
		testimonial: async (_, args, ctx) => {
			return  Project.findById(args._id);
		},
		page: async (_, args, ctx) => {
			return  Page.findById(args._id);
		},
		users: async (_, args, ctx) => {
			return  User.find({});
		},
		clients: async (_, args, ctx) => {
			return  Client.find({}).where('website').equals(args.website);
		},
		pages: async (_, args, ctx) => {
			return  Page.find({}).where('website').equals(args.website);
		},
		projects: async (_, args, ctx) => {
			return  Project.find({}).where('website').equals(args.website);
		},
		testimonials: async (_, args, ctx) => {
			return  Testimonial.find({}).where('website').equals(args.website);
		}
	},
	Mutation: {
		user: async (_, args, ctx) => {
			if(args._id) {
				let selectedUser = await User.findById(args._id);
				for(let key in args){
					if (args.hasOwnProperty(key)) {
						selectedUser[key] = args[key];
					}
				}
				let user = await selectedUser.save();
				user = user.toObject();
				if(user['password']) {
					delete user['password'];
				}
				return user;
			}
			 else{
				let user = new User({...args});
				await user.save();
				if(user['password']) {
					delete user['password'];
				}
				return user;
			}
		},
		website: async (_, args, ctx) => {
			if(args._id) {
				let website = await Website.findById(args._id);
				for(let key in args){
					if (args.hasOwnProperty(key)) {
						website[key] = args[key];
					}
				}
				return await website.save();
			}
			else{
				return await new Website({...args}).save();
			}
		},
		login: async (_, { email, password }, { res }) => {
			const user = await User.findOne({ email: email });
			if (!user) {
				throw new Error('Invalid username or password');
			}
			const valid = await bcrypt.compare(password, user.password);
			if (!valid) {
				throw new Error('Invalid password');
			}
			const website = await Website.findOne({'owner': user._id});
			const accessToken = sign({userId: user._id, websiteId: website._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "7d"});
			res.cookie("access-token", accessToken);
			return {
				token: accessToken,
				user: user
			}
		}
	}
};
