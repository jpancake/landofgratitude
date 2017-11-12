/* globals window */
import { applyMiddleware, createStore, compose } from 'redux'
import Thunk from 'redux-thunk'
import rootReducer from 'reducers'

const configure = (initialState = {}) => {
	const middlewares = [
		Thunk,
	]
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

	const store = createStore(rootReducer, initialState, composeEnhancers(
		applyMiddleware(...middlewares)
	))

	return store
}

export default configure
