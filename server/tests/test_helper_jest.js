const graphql = require('graphql')
const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const mongoose = require('./../db/mongoose')
const { Post } = require('./../models/Post')
const { User } = require('./../models/User')

// Mongoose setup
global.Post = Post
global.User = User

// GraphQL global setup
global.GraphQLString = graphql.GraphQLString
global.GraphQLObjectType = graphql.GraphQLObjectType
global.GraphQLID = graphql.GraphQLID
global.GraphQLInt = graphql.GraphQLInt
global.GraphQLList = graphql.GraphQLList

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const userThreeId = new ObjectID()
const userFourId = new ObjectID()

const users = [
	{
		_id: userOneId,
		email: 'justin@test.com',
		username: 'jpancake',
		password: 'userOnePass',
		followers: [userThreeId, userFourId]
	},
	{
		_id: userTwoId,
		email: 'lomy@test.com',
		username: 'lomy',
		password: 'userTwoPass'
	},
	{
		_id: userThreeId,
		email: 'mark@test.com',
		username: 'mark',
		password: 'userThreePass',
		followers: [userFourId]
	},
	{
		_id: userFourId,
		email: 'gerald@test.com',
		username: 'gerald',
		password: 'userThreePass',
		followers: [userOneId, userTwoId]
	}
]

async function populateUsers() {
	try {
		await User.remove({})
	} catch (e) {
		throw new Error(e)
	}
	await new User(users[0]).save()
	await new User(users[1]).save()
	await new User(users[2]).save()
	await new User(users[3]).save()
}

const postOneId = new ObjectID()
const postTwoId = new ObjectID()
const postThreeId = new ObjectID()
const postFourId = new ObjectID()

const posts = [
	{
		_id: postOneId,
		text: 'Hello World 1!',
		creator: users[0]._id
	},
	{
		_id: postTwoId,
		text: 'Hello World 2!',
		creator: users[1]._id
	},
	{
		_id: postThreeId,
		text: 'Hello World 3!',
		creator: users[2]._id
	},
	{
		_id: postFourId,
		text: 'Hello World 4!',
		creator: users[3]._id
	},
]

async function populatePosts() {
	try {
		await Post.remove({})
	} catch (e) {
		throw new Error(e)
	}
	await new Post(posts[0]).save()
	await new Post(posts[1]).save()
	await new Post(posts[2]).save()
	await new Post(posts[3]).save()
}

const tokens = []

users.forEach((user) => {
	tokens.push(jwt.sign(
		{
			_id: user._id.toHexString(),
			iat: new Date().getTime(),
		},
		process.env.JWT_SECRET).toString())
})

module.exports = { users, posts, populateUsers, populatePosts, mongoose, tokens }
