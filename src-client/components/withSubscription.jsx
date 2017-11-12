import React, { Component } from 'react'
import { graphql } from 'react-apollo'


export default (WrappedComponent, selectData) => {
	return @graphql(selectData, { options: props => ({ variables: { username: props.params.id } }) })
	class App extends Component {
		render() {
			return (
				<WrappedComponent {...this.props} />
			)
		}
	}
}
