import React from 'react'
//import {  useDispatch } from 'react-redux'
import {  createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
//import { removeNotification } from '../reducers/notificationReducer'
//import anecdoteService from './services/anecdotes'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()
  const addAnecdote= async (event) => {
    event.preventDefault()
    const anecdote= event.target.anecdote.value
    event.target.anecdote.value= ''
    //const newAnecdote= await anecdoteService.createNew(anecdote)
    //dispatch(createAnecdote(anecdote))
    //dispatch(setNotification(`Created a new anecdote: ${anecdote}`, 5))
    props.createAnecdote(anecdote)
    props.setNotification(anecdote)
    
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit= {addAnecdote}>
        <div><input name= "anecdote" /></div>
        <button type= "submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote, setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

//export default AnecdoteForm
