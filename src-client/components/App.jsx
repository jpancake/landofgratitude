/* globals $, localStorage */
import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

// Components
import Header from './Header'
import SignupForm from './SignupForm'
import SigninForm from 'components/SigninForm'
import PostsList from './PostsList'
import Profile from 'containers/Profile'
import AddPost from './AddPost'
import EditProfile from './EditProfile'
// Higher Order Components
import RequireAuth from './requireAuth'
import WithSubscription from './withSubscription'
import WithSubscriptionFix from './withSubscriptionFix'
// Queries
import GetUser from './../queries/get_user'

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Route path="/" component={Header} />
				<div className="container">
					<Route path="/signup" component={SignupForm} />
					<Route path="/signin" component={SigninForm} />
					<Route path="/users/:id/profile" component={RequireAuth(EditProfile)} />
					<Route
						exact
		        path="/users/:id"
						component={RequireAuth(Profile)}
					/>
					<Route path="/posts/new" component={RequireAuth(AddPost)} />
					<Route exact path="/" component={RequireAuth(PostsList)} />
				</div>
			</div>
		</BrowserRouter>
	)
}

export default Root
