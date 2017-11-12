import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import AuthForm from './AuthForm'

import Signup from 'mutations/signup'
import getUser from 'queries/get_user'

import * as actions from 'actions/user_actions'

@graphql(getUser)
@graphql(Signup)
@connect(null, actions)

class SignupForm extends Component {
	constructor(props) {
		super(props)
		this.state = { errors: [] }
		this._onSubmit = this._onSubmit.bind(this)
	}
	async _onSubmit(variables) {
		try {
			const user = await this.props.mutate({
				variables,
				refetchQueries: [{ query: getUser }]
			})
			this.props.setToken(user.data.signup.token)
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
				<h3>Sign up</h3>
				<AuthForm onSubmit={this._onSubmit} errors={this.state.errors} form="signup" />
			</section>
		)
	}
}

export default SignupForm
