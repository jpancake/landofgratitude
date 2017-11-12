const { User } = require('./../../models/User')

const { populateUsers } = require('./../test_helper')

const Bobby = {
	email: 'justin@example.com',
	username: 'justin',
	password: 'secret',
}

beforeEach(async () => populateUsers())

describe('User Model', () => {
	describe('Email', () => {
		it('should have error with invalid email', async () => {
			try {
				Bobby.email = 'justin'
				const user = await new User(Bobby)
				await user.save()
			} catch (e) {
				expect(e.errors.email.message).to.eql(`${Bobby.email} is not a valid email`)
			}
		})
		it('should have error with no email', async () => {
			try {
				Bobby.email = null
				const user = await new User(Bobby)
				await user.save()
			} catch (e) {
				expect(e.errors.email.message).to.eql('Path `email` is required.')
			}
		})
		it('should have error with duplicate email', async () => {
			try {
				Bobby.email = 'justin@test.com'
				const user = await new User(Bobby)
				await user.save()
			} catch (e) {
				expect(e.message).to.include('duplicate key error')
			}
		})
	})
	describe('Username', () => {
		it('should have error with no username', async () => {
			try {
				Bobby.username = null
				const user = await new User(Bobby)
				await user.save()
			} catch (e) {
				expect(e.errors.username.message).to.eql('Path `username` is required.')
			}
		})
		it('should have error with duplicate username', async () => {
			try {
				Bobby.username = 'gerald'
				const user = await new User(Bobby)
				await user.save()
			} catch (e) {
				expect(e.message).to.include('duplicate key error')
			}
		})
	})
	describe('Password', () => {
		it('should hash password', async () => {
			try {
				const user = await new User(Bobby)
				await user.save()
				expect(user.password).to.not.equal(Bobby.password)
			} catch (e) {
				throw new Error(e)
			}
		})
		it('should have error with no password', async () => {
			try {
				Bobby.password = null
				const user = await new User(Bobby)
				await user.save()
			} catch (e) {
				expect(e.errors.password.message).to.eql('Path `password` is required.')
			}
		})
		it('should throw and error if the password is less than 6 characters', async () => {
			try {
				Bobby.password = 'secre'
				const user = await new User(Bobby)
				await user.save()
			} catch (e) {
				expect(e.errors.password.message).to.include('is shorter than the minimum allowed length')
			}
		})
	})
})
