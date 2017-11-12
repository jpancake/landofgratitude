import React, { Component } from 'react'
import { graphql } from 'react-apollo'

import getUser from 'queries/get_user'

export default (WrappedComponent) => {
	return @graphql(getUser)
	class App extends Component {
		componentWillUpdate(nextProps) {
			if (!nextProps.data.loading && !nextProps.data.user)
				this.props.history.push('/signup')
		}
		render() {
			return (
				<WrappedComponent {...this.props} />
			)
		}
	}
}
