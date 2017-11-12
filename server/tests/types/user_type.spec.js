/* eslint no-unused-expressions: 0 */
const sinon = require('sinon')
const UserType = require('../../schema/types/user_type')
const PostType = require('../../schema/types/post_type')
const { users, populateUsers, tokens } = require('../test_helper')

const sandbox = sinon.sandbox.create()

const userFields = UserType.getFields()

const controller = require('../../controllers/users_controller')


describe('UserType', () => {
	it('should have a property of _id of type ID', () => {
		expect(userFields).to.have.property('_id')
		expect(userFields._id.type).to.deep.equals(GraphQLID)
	})
	it('should have a property of username of type String', () => {
		expect(userFields).to.have.property('username')
		expect(userFields.username.type).to.eql(GraphQLString)
	})
	it('should have a property of email of type String', () => {
		expect(userFields).to.have.property('email')
		expect(userFields.email.type).to.eql(GraphQLString)
	})
	it('should have a property of token of type String', () => {
		expect(userFields).to.have.property('token')
		expect(userFields.token.type).to.eql(GraphQLString)
	})
	it('should have a property of name of type String', () => {
		expect(userFields).to.have.property('name')
		expect(userFields.name.type).to.eql(GraphQLString)
	})
	it('should have a property of age of type String', () => {
		expect(userFields).to.have.property('age')
		expect(userFields.age.type).to.eql(GraphQLInt)
	})
	it('should have a property of location of type String', () => {
		expect(userFields).to.have.property('location')
		expect(userFields.location.type).to.eql(GraphQLString)
	})
	it('should have a property of website of type String', () => {
		expect(userFields).to.have.property('website')
		expect(userFields.website.type).to.eql(GraphQLString)
	})
	it('should have a property of description of type String', () => {
		expect(userFields).to.have.property('description')
		expect(userFields.description.type).to.eql(GraphQLString)
	})
	it('should have a property of createdAt of type String', () => {
		expect(userFields).to.have.property('createdAt')
		expect(userFields.createdAt.type).to.eql(GraphQLString)
	})
	it('should have a property of posts of type String', () => {
		expect(userFields).to.have.property('posts')
		expect(userFields.posts.type).to.eql(new GraphQLList(PostType))
	})
	it('should have a property of followers of type String', () => {
		expect(userFields).to.have.property('followers')
		expect(userFields.followers.type).to.eql(new GraphQLList(UserType))
	})
	it('should have a property of likedPosts of type String', () => {
		expect(userFields).to.have.property('likedPosts')
		expect(userFields.likedPosts.type).to.eql(new GraphQLList(PostType))
	})
})


describe('resolve', () => {
	beforeEach(() => {
		sandbox.stub(controller, 'followers')
	})
	afterEach(() => sandbox.restore())

	it('should call followers with ID', () => {
		userFields.followers.resolve(null, { id: users[0]._id })
		expect(controller.followers).to.have.been.calledWith(users[0]._id)
	})
})

