const mongoose = require('mongoose')
const { ObjectID } = require('mongodb')

const Post = mongoose.model('Post')
const User = mongoose.model('User')

async function addPost({ text, creator, createdAt }) {
	const post = new Post({ text, creator, createdAt })

	try {
		await post.save()
		await User.findByIdAndUpdate(
			creator,
			{ $addToSet: { posts: post._id } },
		)

		return post
	} catch (e) {
		throw new Error(e)
	}
}

async function fetchPost(id) {
	let post
	if (!ObjectID.isValid(id))
		throw new Error('Invalid ID')

	try {
		post = await Post.findById(id)
	} catch (e) {
		throw new Error(e)
	}

	if (!post) throw new Error('Post not found')
	return post
}

async function removePost({ _id, creator }) {
	let post
	if (!ObjectID.isValid(_id))
		throw new Error('Invalid ID')

	try {
		post = await Post.findOneAndRemove({ _id, creator })
	} catch (e) {
		throw new Error(e)
	}

	if (!post) throw new Error('Post not found')

	return post
}

async function likePost(postId, liked, user) {
	let post
	if (!ObjectID.isValid(postId))
		throw new Error('Invalid ID')
	switch (liked) {
	case true:
		try {
			post = await Post.findByIdAndUpdate(
				postId,
				{ $addToSet: { likes: user } },
				{ new: true })
		} catch (e) {
			throw new Error(e)
		}

		try {
			await User.findOneAndUpdate(
				{ _id: user },
				{ $addToSet: { likedPosts: post._id } })
		} catch (e) {
			throw new Error(e)
		}

		break
	case false:
		try {
			post = await Post.findByIdAndUpdate(
				postId,
				{ $pull: { likes: user } },
				{ new: true })
		} catch (e) {
			throw new Error(e)
		}

		try {
			await User.findOneAndUpdate(
				{ _id: user },
				{ $pull: { likedPosts: post._id } })
		} catch (e) {
			throw new Error(e)
		}
		break
	default:
		throw new Error('There was an Error')
	}

	if (!post) throw new Error('Post not found')



	return post
}

async function fetchMyPosts(username) {
	let user
	// if (!ObjectID.isValid(id))
	// 	throw new Error('Invalid ID')

	try {
		user = await User.findOne({ username }).populate({ path: 'posts', options: { sort: { createdAt: -1 } } })
	} catch (e) {
		throw new Error(e)
	}

	if (!user) throw new Error('User not found')
	return user.posts
}

async function fetchMyLikedPosts(username) {
	let user

	try {
		user = await User.findOne({ username }).populate({ path: 'likedPosts', options: { sort: { createdAt: -1 } } })
	} catch (e) {
		throw new Error(e)
	}

	if (!user) throw new Error('User not found')
	return user.likedPosts
}

module.exports = { addPost, fetchPost, removePost, likePost, fetchMyPosts, fetchMyLikedPosts }
