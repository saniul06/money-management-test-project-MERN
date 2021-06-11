import { combineReducers } from 'redux'
import authReducer from './authReducer'
import transactionReducer from './transactionReducer'
// import loginReducer from './loginReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    transactions: transactionReducer
})

export default rootReducer;