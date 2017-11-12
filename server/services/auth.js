const mongoose = require('mongoose')
const _ = require('lodash')
const User = mongoose.model('User')

async function signup({ email, username, password }) {
	const user = new User({ email, username, password })

	try {
		await user.save()
	} catch (e) {
		throw new Error(e)
	}

	const data = _.pick(user, ['_id', 'email', 'username', 'password'])
	const token = await user.generateAuthToken()
	const res = _.extend({}, { token }, user)
	return res
}

async function signin(email, password) {
	const user = await User.findByCredentials(email, password)

	const token = await user.generateAuthToken()
	const res = _.extend(user, { token })
	return res
}

module.exports = { signup, signin }
