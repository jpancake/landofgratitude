import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from 'apollo'

import auth from './auth_reducer'

const apollo = client.reducer()

const rootReducer = combineReducers({
	apollo,
	auth,
	form,
})

export default rootReducer
