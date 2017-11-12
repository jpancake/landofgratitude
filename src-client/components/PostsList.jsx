import React, { Component } from 'react'
import _ from 'lodash'
import { graphql } from 'react-apollo'

import PostsItem from './PostsItem'

import LikePost from './../mutations/like_post'
import fetchPosts from './../queries/fetch_user_posts'
import fetchLikedPosts from './../queries/fetch_liked_posts'
import GetUser from './../queries/get_user'

@graphql(LikePost)
class PostsList extends Component {
	constructor(props) {
		super(props)
		this.onLike = this.onLike.bind(this)
	}
	async onLike(_id, liked) {
		const { pathname } = this.props.location
		if (pathname === '/')
			await this.props.mutate({
				variables: { _id, liked },
				refetchQueries: [{ query: GetUser }]
			})

		const { posts, likedPosts } = this.props.data

		await this.props.mutate({
			variables: { _id, liked },
			refetchQueries: [{ query: fetchPosts, variables: { username: this.props.params.id } },
				{ query: fetchLikedPosts, variables: { username: this.props.params.id } }
			]
		})
	}
	_renderPosts() {
		let followersPosts = []
		const { pathname } = this.props.location
		if (pathname === '/') {
			const { posts, followers } = this.props.data.user
			followers.forEach((follower) => {
				follower.posts.forEach((post) => {
					followersPosts.push(post)
				})
			})
			const allPosts = _.concat(followersPosts, posts).sort((a, b) => {
				return b.createdAt - a.createdAt
			})

			return allPosts.map((post) => {
				return (<PostsItem
					post={post}
					key={post._id}
					creator={{ name: post.creator.name, username: post.creator.username, _id: post.creator._id }}
					id={this.props.data.user._id}
					likePost={this.onLike}
				/>)
			})
		}

		const { data: { followers, likedPosts, posts }, user } = this.props

		if (!likedPosts)

			return posts.map((post) => {
				return (<PostsItem
					post={post}
					key={post._id}
					creator={{ name: post.creator.name, username: post.creator.username, _id: post.creator._id }}
					id={user._id}
					likePost={this.onLike}
				/>)
			})

		return likedPosts.map((post) => {
			return (<PostsItem
				post={post}
				key={post._id}
				creator={{ name: post.creator.name, username: post.creator.username, _id: post.creator._id }}
				id={user._id}
				likePost={this.onLike}
			/>)
		})
	}
	render() {
		if (this.props.data.loading)
			return <div />
		return (
			<section className="d-flex flex-column">
	      <ul className="list-group">
		      {this._renderPosts()}
	      </ul>
			</section>
		)
	}
}


export default PostsList
