const graphql = require('graphql')
const CreatorType = require('./creator_type')
const { fetchProfile } = require('./../../controllers/users_controller')

const {
	GraphQLObjectType,
  GraphQLString,
  GraphQLID,
	GraphQLList,
	GraphQLInt,
      } = graphql


const PostType = new GraphQLObjectType({
	name: 'PostType',
	fields: () => ({
		_id: { type: GraphQLID },
		text: { type: GraphQLString },
		createdAt: { type: GraphQLString },
		creator: {
			type: CreatorType,
			resolve(parentValue) {
				return fetchProfile(parentValue.creator)
			}
		},
		likes: { type: new GraphQLList(GraphQLID) },
		totalLikes: {
			type: GraphQLInt,
			resolve(parentValue) {
				return parentValue.likes.length
			}
		}
	})
})

module.exports = PostType
