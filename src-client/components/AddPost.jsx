import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import _ from 'lodash'

import * as actions from './../actions/post_actions'

@reduxForm({
	form: 'NewPostForm'
})
@connect(null, actions)

class AddPost extends Component {
	constructor(props) {
		super(props)
		this._onSubmit = this._onSubmit.bind(this)
	}
	async _onSubmit(values) {
		this.props.onSubmit(values)
		this.props.closeModal()
	}
	_renderField(field) {
		const { input, meta: { touched, error } } = field
		return (
			<div className="form-group">
				<input
					label={field.label}
					name={field.name}
					className="form-control"
				  type={field.type}
					{...input}
				  placeholder="What are you grateful for?"
				/>
			</div>
		)
	}
	render() {
		const { handleSubmit } = this.props
		return (
			<form onSubmit={handleSubmit(this._onSubmit)}>
				<Field
					label="Text"
				  name="text"
				  type="text"
					component={this._renderField}
				/>
				<button
					type="submit"
				  className="btn btn-primary"
				> Submit
				</button>
				<button
					type="submit"
				  className="btn btn-danger"
				  onClick={() => this.props.closeModal()}
				> Cancel
				</button>
			</form>
		)
	}
}

export default AddPost
