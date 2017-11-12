import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import * as actions from './../actions/user_actions'

import AlterProfile from 'mutations/edit_profile'
import GetUser from 'queries/get_user'

@graphql(AlterProfile)
@reduxForm({
	form: 'EditProfile',
})
@connect(null, actions)

export default class EditProfile extends Component {
	constructor(props) {
		super(props)
		this._onSubmit = this._onSubmit.bind(this)
	}
	async _onSubmit(values) {
		try {
			await this.props.mutate({
				variables: values
			})
			await this.props.data.refetch()
			this.props.history.push(`/users/${this.props.data.user.username}`)
		} catch (e) {
			throw new Error(e)
		}
	}
	_renderField(field) {
		const { input, label, small, type, placeholder,
			      meta: { touched, error } } = field
		return (
			<div className="form-group">
				<label htmlFor={label}>{label}</label>
				<input
					className="form-control"
				  type={type}
					{...input}
					placeholder={placeholder}
				/>
				<small className="form-text text-muted">{small}</small>
				<div className="text-danger">
					{touched ? error : ''}
				</div>
			</div>
		)
	}
	render() {
		if (this.props.data.loading)
			return <div />
		const { handleSubmit } = this.props
		const { name, username, age, website, location } = this.props.data.user

		return (
			<div>
				<Link to={`/users/${this.props.data.user.username}`}>Back</Link>
	      <form
		      className="form-group"
		      onSubmit={handleSubmit(this._onSubmit)}
	      >
		      <Field
		        label="Full Name"
		        name="name"
		        type="text"
		        placeholder={name}
		        component={this._renderField}
		      />
		      <Field
			      label="Display Name"
			      name="username"
			      type="text"
			      component={this._renderField}
			      small={`http://LandofGratitude.com/users/${username}`}
		      />
		      <Field
			      label="Location"
			      name="location"
			      type="text"
			      component={this._renderField}
		        placeholder={location}
		      />
		      <Field
		        label="Age"
		        name="Age"
		        type="String"
		        placeholder={age}
		        component={this._renderField}
		      />
		      <Field
		        label="Website"
		        name="website"
		        type="website"
		        placeholder={website}
		        component={this._renderField}
		      />
		      <Field
		        label="Description"
		        name="description"
		        type="text"
		        component={this._renderField}
		        small="Tell us about yourself :)"
		      />
		      <button
			      type="submit"
			      className="btn btn-primary"
		      > Submit
		      </button>
	      </form>
			</div>
		)
	}
}
