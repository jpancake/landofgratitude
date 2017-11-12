const jwt_decode = require('jwt-decode')
const { User } = require('./../../models/User')
const AuthService = require('./../../services/auth')
const { populateUsers, users } = require('./../test_helper')

const Bobby = {
	email: 'Bobby@example.com',
	username: 'Bobby',
	password: 'secret',
}


describe('AuthService', () => {

	describe('Signup', async () => {
		beforeEach(async () => { await populateUsers() })
		it('should exist', () => expect(AuthService.signup).to.exist)
		it('should return a token', async () => {
			const user = await AuthService.signup(Bobby)
			expect(user).to.have.any.key('token')
			const token = jwt_decode(user.token)
			const bobby = await User.findById(token._id)
			expect(bobby).to.exist
			expect(bobby.username).to.eql(Bobby.username.toLowerCase())
		})
		it('should sign up user', async () => {
			await AuthService.signup(Bobby)
			const user = await User.findOne({ username: Bobby.username.toLowerCase() })
			expect(user.username).to.eql(Bobby.username.toLowerCase())
		})
		it('should throw error on duplicate email', async () => {
			Bobby.email = 'justin@test.com'
			try {
				await AuthService.signup(Bobby)
			} catch (e) {
				expect(e.toString()).to.include(`${Bobby.email} already in use`)
			}
		})
		it('should throw error if no email', async () => {
			try {
				Bobby.email = null
				await AuthService.signup(Bobby)
			} catch (e) {
				expect(e.toString()).to.include('Path `email` is required')
			}
		})
	})
	describe('signin', () => {
		it('should exist', () => expect(AuthService.signin).to.exist)
		it('should sign up user and return a token', async () => {
			try {
				const me = await AuthService.signin(users[0].email, users[0].password)
				expect(me).to.include.any.keys('token')
				const token = jwt_decode(me.token)
				const user = await User.findById(token._id)
				expect(user).to.exist
				expect(user.username).to.eql(users[0].username.toLowerCase())
			} catch (e) {
				throw new Error(e)
			}
		})
		it('should throw error with wrong credentials', async () => {
			try {
				await AuthService.signin(users[0].email, 'token')
			} catch (e) {
				expect(e).to.include('Wrong Credentials')
			}
		})
	})
})
