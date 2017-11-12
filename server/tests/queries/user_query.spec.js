const { app, users, tokens } = require('./../test_helper')

describe('User Root Query', () => {
	it('should return user query', async () => {
		const query = encodeURI('{ user { _id email username } }')
		const res = await app
			.post(`/graphql?query=${query}`)
			.set('Authorization', `Bearer ${tokens[0]}`)
		const { user } = res.body.data
		expect(user._id).to.eql(users[0]._id.toString())
		expect(user.email).to.eql(users[0].email)
		expect(user.username).to.eql(users[0].username)
	})
})
