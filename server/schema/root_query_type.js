const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString } = graphql

const UserType = require('./types/user_type')
const PostType = require('./types/post_type')

const posts = require('./../controllers/posts_controller')
const users = require('./../controllers/users_controller')

module.exports = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			args: { username: { type: GraphQLString } },
			resolve(parentValue, { username }, req) {
				if (username)
					return users.fetchUser(username)
				return req.user
			}
		},
		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, { id }, req) {
				return posts.fetchPost(id)
			}
		},
		posts: {
			type: new GraphQLList(PostType),
			args: {
				id: { type: GraphQLID },
				username: { type: GraphQLString }
			},
			resolve(parentValue, { id, username }, req) {
				return posts.fetchMyPosts(username)
			}
		},
		likedPosts: {
			type: new GraphQLList(PostType),
			args: {
				id: { type: GraphQLID },
				username: { type: GraphQLString }
			},
			resolve(parentValue, { id, username }, req) {
				return posts.fetchMyLikedPosts(username)
			}
		}
	}
})

