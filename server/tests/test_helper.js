/* globals document, window */
const chai = require('chai')
const { JSDOM } = require('jsdom')
const { ObjectID } = require('mongodb')
const graphql = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const server = require('./../server')

require('./../models')

const { User } = require('./../models/User')

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
	url: 'http://localhost:3090'
})

// jsdom setup
global.document = dom.window.document
global.window = document.defaultView
global.navigator = window.navigator
global.expect = chai.expect

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

const tokens = []

users.forEach((user) => {
	tokens.push(jwt.sign(
		{
			_id: user._id.toHexString(),
			iat: new Date().getTime(),
		},
		process.env.JWT_SECRET).toString())
})

chai.use(require('sinon-chai'))
chai.use(require('chai-http'))
const app = chai.request(server)

module.exports = { users, populateUsers, tokens, app }
