const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const graphqlHTTP = require('express-graphql')
const jwt = require('express-jwt')
const mongoose = require('mongoose')

const config = require('./webpack.devConfig')
const models = require('./server/models/index')
const schema = require('./server/schema/schema')

const User = mongoose.model('User')

require('./server/db/mongoose')
require('./server/config')

const PORT = process.env.PORT || 3050

const server = new WebpackDevServer(webpack(config), {
	port: PORT,
	setup: (app) => {
		app.use(bodyParser.json())
		app.use(morgan('dev'))

		app.use('/graphql', jwt({
			secret: process.env.JWT_SECRET,
			requestProperty: 'auth',
			credentialsRequired: false,
		}))

		app.use('/graphql', async (req, res, done) => {
			try {
				const user = await User.findById(req.auth._id).deepPopulate(['posts.likes', 'likedPosts.likes'])
				req.context = {
					user: user.toJSON(),
				}
				done()
			} catch (e) {
				done()
			}
		})

		app.use('/graphql', graphqlHTTP(req => ({
			schema,
			context: req.context,
			graphiql: true
		})))
	},
	hot: true,
	historyApiFallback: true,
	compress: false,
	quiet: false,
	noInfo: false,
	stats: {
		colors: true
	}
})

server.listen(PORT, 'localhost', () => {
	console.log(chalk.bgWhite.bold(`Webpack Development Server is up and running on port ${PORT}`))
	console.log(chalk.blue(`Browse to http://localhost:${PORT}`))
})

