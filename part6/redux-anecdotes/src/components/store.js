import { createStore, combineReducers } from 'redux'
import anecdoteReducer, { initializeAnecdotes } from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import notificationReducer from '../reducers/notificationReducer'
import anecdoteService from './services/anecdotes'



const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer
})


const store = createStore(reducer)

anecdoteService.getAll().then(anecdotes => 
    store.dispatch(initializeAnecdotes(anecdotes)))


export default store