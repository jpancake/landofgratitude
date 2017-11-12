import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import AuthForm from './AuthForm'

import Signin from 'mutations/signin'
import getUser from 'queries/get_user'

import * as actions from 'actions/user_actions'

@graphql(getUser)
@graphql(Signin)
@connect(null, actions)

class SigninForm extends Component {
	constructor(props) {
		super(props)
		this.state = { errors: [] }
		this._onSubmit = this._onSubmit.bind(this)
	}
	async _onSubmit(variables) {
		try {
			const user = await this.props.mutate({
				variables
			})
			this.props.setToken(user.data.signin.token)
			await this.props.data.refetch()
			this.props.authUser()

			this.props.history.push('/')
		} catch (e) {
			throw new Error(e)
		}
	}
	render() {
		return (
			<section>
				<Link to="/"> Back </Link>
				<h3>Sign in</h3>
				<AuthForm onSubmit={this._onSubmit} errors={this.state.errors} />
			</section>
		)
	}
}

export default SigninForm