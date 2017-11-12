const mongoose = require('mongoose')
const validator = require('validator')
const moment = require('moment')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		trim: true,
		minlength: 5,
		required: true,
		unique: true,
		lowercase: true,
		validate: {
			isAsync: true,
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email',
		},
	},
	username: {
		type: String,
		minlength: 1,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	age: {
		type: Number
	},
	location: {
		type: String
	},
	website: {
		type: String
	},
	name: {
		type: String
	},
	description: {
		type: String,
	},
	likedPosts: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		default: [],
	},
	createdAt: {
		type: Number,
		default: moment(),
		required: true,
	},
	posts: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
		default: []
	},
	followers: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		default: []
	},
})

UserSchema.pre('save', function encryptPassword(next) {
	const user = this

	if (!user.isModified('password')) return next()

	bcrypt.genSalt(10, (error, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return next(err)
			user.password = hash
			return next()
		})
	})
})

UserSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()
	return _.pick(userObject, ['_id', 'createdAt', 'username', 'email', 'name', 'age', 'location', 'website', 'description', 'posts', 'likedPosts', 'followers'])
}

UserSchema.methods.generateAuthToken = function () {
	const user = this

	const token = jwt.sign(
		{
			_id: user._id.toHexString(),
			iat: new Date().getTime()
		},
		process.env.JWT_SECRET,
		{ expiresIn: '168h' }).toString()

	return token
}

UserSchema.statics.findByCredentials = async function (email, password) {
	const User = this
	const user = await User.findOne({ email })
	if (!user) return Promise.reject()
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, user.password, (err, res) => {
			if (res) resolve(user)
			reject('Wrong Credentials')
		})
	})
}

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
		if (err) return cb(err)
		return cb(null, isMatch)
	})
}

UserSchema.plugin(deepPopulate, {
	populate: {
		posts: {
			options: {
				sort: {
					createdAt: -1
				}
			}
		},
		likedPosts: {
			options: {
				sort: {
					createdAt: -1
				}
			}
		}
	}
})
UserSchema.plugin(uniqueValidator, { message: 'Error, {VALUE} already in use' })

const User = mongoose.model('User', UserSchema)

module.exports = { User }
