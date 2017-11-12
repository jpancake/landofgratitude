/* globals $, localStorage */
import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import jwtDecode from 'jwt-decode'

import './styles'

import client from 'apollo'
import App from 'components/App'

import configureStore from 'store'
const store = configureStore()

import { AUTH, TOKEN } from './actions/user_types'

const token = localStorage.getItem('token')
if (token === 'undefined')
	localStorage.removeItem('token')

try {
	const decoded = jwtDecode(token)
	if (decoded)
		store.dispatch({ type: TOKEN, payload: token })
		store.dispatch({ type: AUTH })
} catch (e) {

}

render(
	<ApolloProvider store={store} client={client}>
		<App />
	</ApolloProvider>, $('#root')[0])

if (module.hot)
	module.hot.accept()
