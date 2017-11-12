const graphql = require('graphql')
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
      } = graphql

const PostType = require('./post_type')
const posts = require('./../../controllers/posts_controller')
const users = require('./../../controllers/users_controller')

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: () => ({
		_id: { type: GraphQLID },
		username: { type: GraphQLString },
		email: { type: GraphQLString },
		token: { type: GraphQLString },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		location: { type: GraphQLString },
		website: { type: GraphQLString },
		description: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		posts: { type: new GraphQLList(PostType) },
		followers: {
			type: new GraphQLList(UserType),
			args: {
				id: { type: GraphQLID }
			},
			resolve(parentValue, { id }, req) {
				if (id) return users.followers(id)
				return users.followers(req.user._id)
			}
		},
		likedPosts: { type: new GraphQLList(PostType) },
	})
})

module.exports = UserType
