import React, { Component } from 'react'
import moment from 'moment'
import FontAwesome from 'react-fontawesome'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'

import getID from './../queries/get_ID'


@graphql(getID)
class PostsItem extends Component {
	constructor(props) {
		super(props)
		this.likePost = this.likePost.bind(this)
	}
	async likePost(id) {
		const { likes } = this.props.post
		const { _id } = this.props.data.profile
		if (likes.includes(_id))
			this.props.likePost(id, false)
		else
			this.props.likePost(id, true)
	}
	renderLink() {
		const { _id } = this.props.data.profile
		const postId = this.props.creator._id
		const { username, name } = this.props.creator


		if (_id === postId)
			return <span>{name}</span>
		return (
			<Link to={`/users/${username}`}>{name}</Link>
		)
	}
	render() {
		const {
			post: { _id, text, createdAt, likes, totalLikes },
      creator: { name, username }, id } = this.props

		return (
      <li className="list-group-item">
	      <div>
		      <div>
			      <h6>{this.renderLink()} <small className="faded">@{username} | {moment.unix(createdAt).format('DD MMMM')}</small>
			      </h6>
			      <p>{text}</p>
		      </div>
		      <div className="d-flex align-content-center">
			      <FontAwesome name="reply" className="icon-colors" />
			      <FontAwesome name="retweet" className="icon-colors" />
			      <div className="likes">
			        <FontAwesome name="heart" className="icon-colors" onClick={() => this.likePost(_id)} />
				      {totalLikes}
			      </div>
		      </div>
	      </div>
      </li>
		)
	}
}

export default PostsItem
