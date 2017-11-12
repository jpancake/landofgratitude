import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import * as actions from './../actions/user_actions'

function validate(values) {
	const errors = {}
	if (values.confirmPassword)
		if (values.password !== values.confirmPassword)
			errors.password = 'Passwords must be the same'
	return errors
}

@reduxForm({
	validate,
	form: 'AuthForm'
})
@connect(null, actions)

class AuthForm extends Component {
	constructor(props) {
		super(props)
		this._onSubmit = this._onSubmit.bind(this)
	}
	_onSubmit(values) {
		const variables = _.pick(values, ['email', 'username', 'password'])
		this.props.onSubmit(variables)
	}
	_renderField(field) {
		const { input, meta: { touched, error } } = field
		const className = `form-group ${touched && error ? 'has-danger' : ''}`
		return (
			<div className={className}>
				<label htmlFor={field.label}>{field.label}</label>
				<input
					className="form-control"
				  type={field.type}
					{...input}
				/>
				<div className="text-danger">
					{touched ? error : ''}
				</div>
			</div>
		)
	}
	_renderPassword() {
		if (this.props.form === 'signup')
			return (
				<Field
					label="Confirm Password"
					name="confirmPassword"
					type="password"
					component={this._renderField}
				/>
			)
	}
	_renderUsername() {
		if (this.props.form === 'signup')
			return (
				<Field
					label="Username"
					name="username"
					type="text"
					component={this._renderField}
				/>
			)
	}
	render() {
		const { handleSubmit } = this.props
		return (
	    <form onSubmit={handleSubmit(this._onSubmit)}>
		    <Field
			    label="Email"
			    name="email"
			    type="text"
			    component={this._renderField}
		    />
		    {this._renderUsername()}
		    <Field
			    label="Password"
			    name="password"
			    type="password"
			    component={this._renderField}
		    />
		    {this._renderPassword()}
		    <button
			    type="submit"
		      className="btn btn-primary"
		    > Submit
		    </button>
	    </form>
		)
	}
}

export default AuthForm
