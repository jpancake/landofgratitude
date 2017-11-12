import React, { Component } from 'react'
import { graphql } from 'react-apollo'


export default (WrappedComponent, selectData) => {
	return @graphql(selectData)
	class App extends Component {
		render() {
			return (
				<WrappedComponent {...this.props} />
			)
		}
	}
}
