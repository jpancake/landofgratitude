const graphql = require('graphql')
const PostType = require('./post_type')
const { fetchProfile } = require('./../../controllers/users_controller')

const {
	GraphQLObjectType,
  GraphQLString,
  GraphQLID,
	GraphQLList,
	GraphQLInt,
      } = graphql


const AllPostType = new GraphQLObjectType({
	name: 'allPostType',
	fields: () => ({
		userPosts: {
			type: new GraphQLList(PostType),
			resolve() {

			}
		},
		followersPosts: {
			type: new GraphQLList(PostType),
			resolve() {

			}
		},
		likedPosts: {
			type: new GraphQLList(PostType),
			resolve() {

			}
		}
	})
})

module.exports = PostType
