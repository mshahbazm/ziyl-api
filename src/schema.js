const { gql } = require('apollo-server-express');

const typeDefs = gql`
	union Result = User | Website
	
	interface MutationResponse {
	  code: String!
	  success: Boolean!
	  message: String!
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
		website: [Website!]!
		experience: [Experience!]!
		education: [Education!]!
	}
	
	type generalResponse implements MutationResponse{
		code: String!
		success: Boolean!
		message: String!
		result: Result!
	}
	
	input userInput{
		first_name: String
		last_name: String
		email: String
		password: String
		image: String
		phone: String
		city: String
		country: String
		bio: String
	}
	
	type Website {
		_id: ID
		title: String!
		domain: String!
		owner: User!
		language: String
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
		testimonials: [Testimonial!]!
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
		owner: User!
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
		owner: User!
	}
	
	#Experience, Education, Client, Testimonial, Project, Page, Website
	type Query {
		me: User!
		getUsers: [User!]!
		getEducation(user: ID!): [Education!]!
		getExperience(user: ID!): [Education!]!
		getPages(website: ID!): [Page!]!
		getProjects(website: ID!): [Project!]!
		getTestimonials(website: ID!): [Project!]!
		getClients(website: ID!): [Client!]!
		
		user(_id: ID!): User!
		website(_id: ID!): Website!
		project(_id: ID!): Project
		testimonial(_id: ID!): Testimonial
	}

	type Mutation {
		user(user: userInput) : generalResponse
		login(email: String, password: String): String # login token
	}
`;

module.exports = typeDefs;
