const { ObjectID } = require('mongodb')
const controller = require('../../controllers/users_controller')
const { users, populateUsers } = require('../test_helper')
const { User } = require('../../models/User')

beforeEach(async () => {
	await populateUsers()
})

describe('User Controller', () => {
	describe('followUser', () => {
		it('should exist', () => expect(controller.followUser).to.exist)
		it('should follow a user', async () => {
			const data = await controller.followUser(users[0]._id, users[1]._id, true)
			expect(data.followers.length).to.equal(1)
			const user = await User.findById(users[0]._id)
			expect(user.followers[0]).to.eql(users[1]._id)
		})
		it('should throw error if no user is found', async () => {
			const id = new ObjectID()
			try {
				await controller.followUser(id, users[1]._id, false)
			} catch (e) {
				expect(e).to.be.an('error')
				expect(e.toString()).to.eql('Error: User not found')
			}
		})
		it('should throw error if invalid id', async () => {
			try {
				await controller.followUser('abc123', users[1]._id, true)
			} catch (e) {
				expect(e).to.be.an('error')
				expect(e.toString()).to.include('Invalid ID')
			}
		})
		it('should throw argument error', async () => {
			try {
				await controller.followUser(users[1]._id, users[0]._id)
			} catch (e) {
				expect(e).to.be.an('error')
				expect(e.toString()).to.include('An Error Occured...')
			}
		})
	})
	describe('fetchFollowers', () => {
		it('should exist', () => expect(controller.followers).to.exist)
		it('should fetch followers data', async () => {
			try {
				const data = await controller.followers(users[0]._id)
				expect(data).to.have.length(2)
				expect(data[0]._id).to.eql(users[2]._id)
				expect(data[1]._id).to.eql(users[3]._id)
			} catch (e) {
				throw new Error(e)
			}
		})
	})
	describe('editProfile', () => {
		it('should exist', () => expect(controller.editProfile).to.exist)
		it('should edit profile', async () => {
			const args = {
				age: 20,
				location: 'California',
				website: 'instagram.com/jpancake_',
				description: 'Hello World!',
				name: 'Justin'
			}
			const { age, location, website, description, name } = args
			const data = await controller.editProfile(users[0]._id, args)
			expect(data.age).to.eql(age)
			expect(data.location).to.eql(location)
			expect(data.website).to.eql(website)
			expect(data.description).to.eql(description)
			expect(data.name).to.eql(name)
		})
	})
})
