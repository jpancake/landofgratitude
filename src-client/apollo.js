/* globals localStorage */
import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
	uri: '/graphql',
})

networkInterface.use([{
	applyMiddleware(req, next) {
		if (!req.options.headers)
			req.options.headers = {}
		const token = localStorage.getItem('token')
		req.options.headers.Authorization = token ? `Bearer ${token}` : ''
		next()
	}
}])

const client = new ApolloClient({
	networkInterface,
	dataIdFromObject: o => o._id
})

export default client
