const graphql = require('graphql')

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLBoolean,
	GraphQLFloat,
      } = graphql

const UserType = require('./types/user_type')
const PostType = require('./types/post_type')
const posts = require('./../controllers/posts_controller')
const users = require('./../controllers/users_controller')
const AuthService = require('./../services/auth')

module.exports = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		signup: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				username: { type: GraphQLString },
				password: { type: GraphQLString },
			},
			resolve(parentValue, { email, username, password }) {
				return AuthService.signup({ email, username, password })
			}
		},
		signin: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(parentValue, { email, password }) {
				return AuthService.signin(email, password)
			}
		},
		editProfile: {
			type: UserType,
			args: {
				age: { type: GraphQLInt },
				location: { type: GraphQLString },
				website: { type: GraphQLString },
				description: { type: GraphQLString },
				name: { type: GraphQLString },
			},
			resolve(parentValue, args, req) {
				return users.editProfile(req.user._id, args)
			}
		},
		followUser: {
			type: UserType,
			args: {
				id: { type: GraphQLString },
				follow: { type: GraphQLBoolean },
			},
			resolve(parentValue, { id, follow }, req) {
				if (!req.user) throw new Error('Please log in')
				return users.followUser(req.user._id, id, follow)
			}
		},
		addPost: {
			type: PostType,
			args: {
				text: { type: GraphQLString },
				createdAt: { type: GraphQLFloat },
			},
			resolve(parentValue, { text, createdAt }, req) {
				if (!req.user) throw new Error('Please log in')
				const creator = req.user._id
				return posts.addPost({ text, creator, createdAt })
			}
		},
		removePost: {
			type: PostType,
			args: {
				_id: { type: GraphQLString },
			},
			resolve(parentValue, { _id }, req) {
				if (!req.user) throw new Error('Please log in')
				const creator = req.user._id
				return posts.removePost({ _id, creator })
			}
		},
		likePost: {
			type: PostType,
			args: {
				_id: { type: GraphQLString },
				liked: { type: GraphQLBoolean }
			},
			resolve(parentValue, { _id, liked }, req) {
				if (!req.user) throw new Error('Please log in')
				const creator = req.user._id
				return posts.likePost(_id, liked, creator)
			}
		}
	}
})
