const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const graphQLHTTP = require('express-graphql')
const jwt = require('express-jwt')
const mongoose = require('mongoose')

const models = require('./models')
const schema = require('./schema/schema')

const User = mongoose.model('User')

require('./db/mongoose')
require('./config')

// Express Configuration
const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())

// Routes
app.use('/graphql', jwt({
	secret: process.env.JWT_SECRET,
	requestProperty: 'auth',
	credentialsRequired: false,
}))

app.use('/graphql', async (req, res, done) => {
	try {
		const user = await User.findById(req.auth._id).deepPopulate(['posts.creator', 'likedPosts.likes'])
		req.context = {
			user: user.toJSON(),
		}
		done()
	} catch (e) {
		done()
	}
})

app.use('/graphql', graphQLHTTP(req => ({
	schema,
	context: req.context,
	graphiql: true
})))

const PORT = 3090
app.listen(PORT, () => console.log(`Node Server Listening on port ${PORT}`))

module.exports = app

