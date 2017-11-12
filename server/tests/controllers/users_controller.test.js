/* globals Post, User */
const userController = require('./../../controllers/users_controller')
const { users, posts, populatePosts, populateUsers, mongoose } = require('./../test_helper_jest')


describe('User Controller', () => {
	it('should exist', () => expect(userController).toExist)
	describe('followUser', () => {
		it('should exist', () => expect(userController.followUser).toExist)
	})
})
