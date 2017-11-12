const mongoose = require('mongoose')
const moment = require('moment')


const Post = mongoose.model('Post', {
	text: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 140,
		trim: true,
	},
	createdAt: {
		type: Number,
		default: moment().unix(),
		required: true,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	likes: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		default: []
	}
})


module.exports = { Post }