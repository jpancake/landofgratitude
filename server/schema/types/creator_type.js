const graphql = require('graphql')
const {
	      GraphQLObjectType,
	      GraphQLString,
	      GraphQLInt,
				GraphQLID
      } = graphql


const CreatorType = new GraphQLObjectType({
	name: 'CreatorType',
	fields: () => ({
		_id: { type: GraphQLID },
		username: { type: GraphQLString },
		name: { type: GraphQLString },
	})
})

module.exports = CreatorType
