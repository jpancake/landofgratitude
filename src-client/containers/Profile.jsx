import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { graphql } from 'react-apollo'

import Biography from 'components/Biography'
import WithSubscription from './../components/withSubscription'
import PostsList from './../components/PostsList'
import fetchUserPosts from './../queries/fetch_user_posts'
import fetchLikedPosts from './../queries/fetch_liked_posts'
import fetchProfile from './../queries/fetch_profile'
import getUser from './../queries/get_user'

const UserDashboard = WithSubscription(PostsList, fetchUserPosts)
const LikesDashboard = WithSubscription(PostsList, fetchLikedPosts)

@graphql(fetchProfile, { options: props => ({ variables: { username: props.match.params.id } }) })
export default class Profile extends Component {
	render() {
		const { pathname } = this.props.location
		const { params } = this.props.match
		return (
      <div className="row" id="profile">
	      <div className="col-sm-5 col-lg-4">
	        <Biography user={this.props.data.userProfile} />
	      </div>
	      <div className="col-sm-7 col-lg-8">
		      <Tabs defaultIndex={0} selectedTabClassName="nav-link active">
			      <TabList className="nav nav-tabs nav-fill">
				      <Tab className="nav-item">Posts</Tab>
				      <Tab className="nav-item">Liked posts</Tab>
			      </TabList>
			      <TabPanel>
				      <UserDashboard
					      location={{ pathname }}
					      user={this.props.data.userProfile}
					      params={params}
				      />
			      </TabPanel>
			      <TabPanel>
				      <LikesDashboard
					      location={{ pathname }}
					      user={this.props.data.userProfile}
					      params={params}
				      />
			      </TabPanel>
		      </Tabs>
	      </div>
      </div>
		)
	}
}

