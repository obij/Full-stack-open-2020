import { createStore, combineReducers } from 'redux'
import anecdoteReducer from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import notificationReducer from '../reducers/notificationReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
})


const store = createStore(reducer)


export default store