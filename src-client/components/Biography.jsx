import React, { Component } from 'react'
import moment from 'moment'
import FontAwesome from 'react-fontawesome'
import { graphql } from 'react-apollo'

import getMe from './../queries/get_ID'
import followUser from '../mutations/follow_user'

@graphql(getMe)
@graphql(followUser)
class Biography extends Component {
	constructor(props) {
		super(props)
		this.followUser = this.followUser.bind(this)
	}
	followUser() {
		this.props.mutate({
			variables: {
				id: this.props.user._id,
				follow: true
			}
		})
	}
	renderButton() {
		const me = this.props.data.profile._id
		const { _id } = this.props.user
		if (me !== _id) {
			return <button className="btn btn-success" onClick={this.followUser}>Follow User</button>
		}
	}
	render() {
  	if (!this.props.user)
  		return <div />
	  const { _id, age, createdAt, username,
		        name, location, description, website } = this.props.user
		return (
      <aside id="biography">
	      <div className="container d-flex flex-column">
		      <h4>{name}</h4>
		      <h6 className="faded">@{username}</h6>
		      <p>{description}</p>
		      <h6><FontAwesome name="map-marker" className="icon" />{location}</h6>
		      <h6 className="faded"><FontAwesome name="instagram" className="icon" />{website}</h6>
		      <h6><FontAwesome name="clock-o" className="icon" />Joined {moment.unix(createdAt / 1000).format('MMM DD YYYY')}</h6>
		      {this.renderButton()}
	      </div>
      </aside>
		)
	}
}

export default Biography
