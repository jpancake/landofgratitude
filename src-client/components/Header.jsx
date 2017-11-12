import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { graphql, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import AddPost from './AddPost'
import * as actions from './../actions/user_actions'

import GetUser from './../queries/get_user'
import fetchPosts from './../queries/fetch_user_posts'
import NewPost from 'mutations/add_post'


const backgroundColor = {
	backgroundColor: '#e3f2fd',
}

@withApollo
@graphql(GetUser)
@graphql(NewPost)
@connect((state) => {
	return { authenticated: state.auth.authenticated }
}, actions)

class Header extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false
		}
		this._onSubmit = this._onSubmit.bind(this)
		this._onLogoutClick = this._onLogoutClick.bind(this)
		this.handleOpenModal = this.handleOpenModal.bind(this)
		this.handleCloseModal = this.handleCloseModal.bind(this)
	}
	async _onLogoutClick() {
		this.props.deauthUser()
		this.props.client.resetStore()
	}
	handleOpenModal() {
		this.setState({ showModal: true })
	}

	handleCloseModal() {
		this.setState({ showModal: false })
	}
	_onSubmit(variables) {
		const post = _.extend(variables, { createdAt: moment().unix() })
		if (this.props.location.pathname === '/')
			this.props.mutate({
				variables: post,
				refetchQueries: [{ query: GetUser }]
			})
		else
			this.props.mutate({
				variables,
				refetchQueries: [{ query: fetchPosts, variables: { username: this.props.data.user.username } }]
			})
	}
	_renderButtons() {
		const { loading, user } = this.props.data
		console.log(this.props.data)
		if (loading)
			return <div />
		if (this.props.authenticated)
			return (
				<a
					href="http://localhost:3050"
					className="dropdown-toggle"
					data-toggle="dropdown"
				>
					{user.email}
				</a>
			)
		return (
			<div className="d-flex flex-row">
				<Link to="/signup">
					<span className="navbar-text">Sign up</span>
				</Link>
				<Link to="/signin">
				<span className="navbar-text">Login</span>
				</Link>
			</div>
		)
	}
	_renderPostButton() {
		const { loading, user } = this.props.data
		if (loading)
			return <div />
		if (this.props.authenticated)
			return (
				<div>
					<button
						onClick={this.handleOpenModal}
						className="btn btn-primary align-self-end"
					>
						Add Post
					</button>
					<ReactModal
						isOpen={this.state.showModal}
					  contentLabel="Create Post"
					>
						<AddPost onSubmit={this._onSubmit} closeModal={this.handleCloseModal} />
					</ReactModal>
				</div>
			)
		return <div />
	}
	render() {
		const { user } = this.props.data
		const username = user ? user.username : ''

		return (
      <nav className="navbar navbar-toggleable-sm navbar-light bg-faded" style={backgroundColor}>
	      <div className="container">
		      <div className="collapse navbar-collapse">
			      <div className="navbar-nav">
				      <Link to="/" className="nav-item nav-link active">Home</Link>
				      <Link to="/" className="nav-item nav-link">Features</Link>
			      </div>
		      </div>
		      <div className="dropdown">
			      {this._renderButtons()}
			      <div
				      className="dropdown-menu"
				      aria-labelledby="navbarDropdownMenuLink"
			      >
				      <Link
					      className="dropdown-item"
					      to={`/users/${username}`}
				      >View Profile
				      </Link>
				      <Link
					      className="dropdown-item"
					      to={`/users/${username}/settings`}
				      >Settings
				      </Link>
				      <Link
					      className="dropdown-item"
					      to={`/users/${username}/profile`}
				      >Edit Profile
				      </Link>
				      <Link
					      className="dropdown-item"
					      to="#"
					      onClick={this._onLogoutClick}
				      >Logout
				      </Link>
			      </div>
		      </div>
		      {this._renderPostButton()}
	      </div>
      </nav>
		)
	}
}


export default Header
