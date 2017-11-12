import { graphql } from 'graphql'
import schema from './../../schema/schema'
import { User } from './../../models/User'

import { populateUsers } from './../test_helper_jest'

describe('mutations', () => {
	describe('signup', () => {
		beforeAll(async () => {
			await populateUsers()
		})
		it('should sign up user', async () => {
			const query = `
				mutation {
          signup(email: "hello@example.com", username: "hello", password: "secret") {
            _id
            email
            username
          }
				}
			`

			const result = await graphql(schema, query, {}, {})
			const { data } = result

			expect(data.signup.email).toEqual('hello@example.com')
			expect(data.signup.username).toEqual('hello')
		})
	})
})
