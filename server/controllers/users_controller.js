const mongoose = require('mongoose')
const _ = require('lodash')
const { ObjectID } = require('mongodb')
const User = mongoose.model('User')

async function followUser(id, userId, directive) {
	let user
	let data
	if (!ObjectID.isValid(id) || !ObjectID.isValid(userId))
		throw new Error('Invalid ID')

	switch (directive) {
	case true:
		try {
			user = await User.findOneAndUpdate(
				{ _id: id },
				{ $addToSet: { followers: userId } },
				{ new: true }
			).populate({ path: 'followers' })

			if (user)
				data = user.followers[user.followers.length - 1]
		}	catch (e)	{
			throw new Error(e)
		}
		break
	case false:
		try {
			user = await User.findByIdAndUpdate(
				id,
				{ $pull: { followers: userId } },
				{ new: true }
			)
			data = await User.findById(userId)
		} catch (e) {
			throw new Error(e)
		}
		break
	default:
		throw new Error('An Error Occured...')
	}
	if (!user) throw new Error('User not found')

	return data
}

async function followers(id) {
	let user

	if (!ObjectID.isValid(id))
		throw new Error('Invalid ID')

	try {
		user = await User.findById(id).populate({
			path: 'followers',
			populate: { path: 'posts' }
		})
	} catch (e) {
		throw new Error(e)
	}

	if (!user) throw new Error('User not found')
	return user.followers
}

async function editProfile(id, args) {
	try {
		const user = await User.findByIdAndUpdate(id, { $set: args }, { new: true })
		await user.save()
		return user
	} catch (e) {
		throw new Error(e)
	}
}

async function fetchProfile(creator) {
	try {
		const user = await User.findById(creator)
		return user
	} catch (e) {
		throw new Error(e)
	}
}

async function fetchUser(username) {
	try {
		const user = await User.findOne({ username })
		return user
	} catch (e) {
		throw new Error(e)
	}
}


module.exports = { editProfile, followUser, fetchProfile, fetchUser, followers }
