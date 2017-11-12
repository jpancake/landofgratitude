import React, { Component } from 'react'

import PostsList from './PostsList'
import AddPost from './AddPost'

export default class Dashboard extends Component {
	render() {
		if (this.props.data.loading)
			return <div />

		const { likedPosts, posts } = this.props.data
		const { followers } = this.props.data.user ? this.props.data.user : ''
		return (
      <section className="d-flex flex-column" id="dashboard">
       <PostsList
	       likedPosts={likedPosts}
	       posts={posts}
	       followers={followers}
	       location={this.props.location.pathname ? this.props.location.pathname : ''}
       />
      </section>
		)
	}
}
