const mongoose = require('mongoose')
require('./../config')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection
	.once('open', () => console.log('Connected to MongoDB instance.'))
	.on('error', error => console.log('Error connecting to MongoDB:', error))

module.exports = { mongoose }
