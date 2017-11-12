import { graphql } from 'graphql'
import schema from './../../schema/schema'
import { User } from './../../models/User'

import { populateUsers } from './../test_helper_jest'

xdescribe('User Query', () => {
	beforeAll(() => populateUsers())
	it('should be null when user is not logged in', async () => {
		const query = `
		{
			user {
				_id
				email
			}
		}
	`
		const rootValue = {}
		const context = {}
		const result = await graphql(schema, query, rootValue, context)
		const { data } = result
		expect(data.user).toBe(null)
	})
	it('should return the current user when user is logged in', async () => {
		const user = new User({
			email: 'justin@examples.com',
			password: 'secret',
			username: 'jpancakey'
		})
		await user.save()

		const query = `
		{
			user {
				_id
				email
				username
			}
		}
	`
		const rootValue = {}
		const context = { user }
		const result = await graphql(schema, query, rootValue, context)
		const { data } = result
		expect(data.user._id).toContain(user._id)
		expect(data.user.email).toEqual(user.email)
		expect(data.user.username).toEqual(user.username)
	})
})
