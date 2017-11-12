const UserType = require('../../schema/types/user_type')
const PostType = require('../../schema/types/post_type')

const postFields = PostType.getFields()

xdescribe('POST TYPE', () => {
	it('should have a property of _id of type ID', () => {
		expect(postFields).toHaveProperty('_id')
		expect(postFields._id.type).toEqual(GraphQLID)
	})
	it('should have a property of text of type String', () => {
		expect(postFields).toHaveProperty('text')
		expect(postFields.text.type).toEqual(GraphQLString)
	})
	it('should have a property of createdAt of type String', () => {
		expect(postFields).toHaveProperty('createdAt')
		expect(postFields.createdAt.type).toEqual(GraphQLString)
	})
	it('should have a property of creator of type String', () => {
		expect(postFields).toHaveProperty('creator')
		expect(postFields.creator.type).toEqual(GraphQLID)
	})
	it('should have a property of likes of type String', () => {
		expect(postFields).toHaveProperty('likes')
		expect(postFields.likes.type).toEqual(new GraphQLList(PostType))
	})
})

