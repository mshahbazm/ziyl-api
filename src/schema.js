const { gql } = require('apollo-server-express');

const typeDefs = gql`
	
	type authPayload {
		token: String,
		user: User
	}	
	
	type User {
		_id: ID
		first_name: String
		last_name: String
		email: String
		password: String
		image: String
		phone: String
		city: String
		country: String
		bio: String
		last_login: String
	}
	
	type UserResponse {
		_id: ID
		first_name: String
		last_name: String
		email: String
		image: String
		phone: String
		city: String
		country: String
		bio: String
		last_login: String
		websites: [Website!]!
		#experience: [Experience!]!
		#education: [Education!]!
	}
	
	type Website {
		_id: ID
		title: String!
		domain: String!
		language: String,
		owner: User!
	}
	
	type Page {
		_id: ID
		title: String
		slug: String
		markdown: String
		html: String
		isPublished: Boolean 
		language: String
		meta_title: String
		meta_description: String
		website: Website!
	}
	
	type Project {
		_id: ID
		title: String
		media: [String]!
		external_link: String
		client: Client
		description: String
		isPublished: Boolean 
		tags: [Tag]
		#skills: [Skill!]!
		#testimonials: [Testimonial!]!
		website: Website!
	}
	
	type Tag {
		_id: ID
		title: String!
		website: Website!
	}
	
	type Testimonial {
		_id: ID
		text: String
		reviewer: Client!
		isPublished: Boolean
		project: ID
		website: Website!
	}
	
	type Client {
		_id: ID
		name: String
		email: String
		company: String
		isPublished: Boolean
		website: Website!
	}
	
	type Education {
		_id: ID
		institute: String
		start_year: String
		end_year: String
		degree: String
		description: String
		isPublished: Boolean
		website: Website!
	}
	
	type Experience {
		_id: ID
		company: String
		title: String
		start: String
		end: String
		is_current: String
		description: String
		isPublished: Boolean
		website: Website!
	}
		
	type Query {
		me: UserResponse!
		users: [UserResponse]!
		education(website: ID): [Education]!
		experience(website: ID): [Experience]!
		websites(website: ID): [Website]! #get all website of a user
		pages(website: ID): [Page]!
		projects(website: ID!): [Project]!
		testimonials(website: ID!): [Testimonial]!
		clients(website: ID!): [Client]!
		
		#get followings by ID
		user(_id: ID!): UserResponse!
		website(_id: ID!): Website! 
		project(_id: ID!): Project! 
		testimonial(_id: ID!): Testimonial! 
		page(_id: ID!): Page! 
	}

	type Mutation {
		user(_id: ID, first_name: String, last_name: String, email: String, password: String, image: String, phone: String, city: String, country: String, bio: String) : UserResponse
		website(_id: ID, title: String, domain: String, language: String, owner: ID) : Website
		register(email: String!, password: String!): UserResponse
		login(email: String, password: String): authPayload 
	}
`;

module.exports = typeDefs;
