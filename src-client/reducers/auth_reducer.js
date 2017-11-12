import { AUTH, DEAUTH, TOKEN } from '../actions/user_types'
export default function (state = {}, action) {
	switch (action.type) {
	case DEAUTH:
		return { authenticated: false }
	case AUTH:
		return { ...state, authenticated: true }
	case TOKEN:
		return { ...state, token: action.payload }
	default:
		return state
	}
}
