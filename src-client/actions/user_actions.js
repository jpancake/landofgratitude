/* globals localStorage */

import { AUTH, DEAUTH, TOKEN } from './user_types'

export function deauthUser() {
	localStorage.removeItem('token')
	return { type: DEAUTH }
}

export function authUser() {
	return { type: AUTH }
}

export function setToken(token) {
	localStorage.setItem('token', token)
	return {
		type: TOKEN,
		payload: token
	}
}

