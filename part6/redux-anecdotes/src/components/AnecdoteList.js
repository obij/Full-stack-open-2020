import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { removeNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {
  //const anecdotes = useSelector(state => state.anecdotes)
  const anecdotes = useSelector(state => {
     if(state.filter === ''){
         return state.anecdotes
     }else if(state.filter !== ''){
         return state.anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()) )
     }
  })
  console.log('anecdotes in anecdote list is ', anecdotes)
  const dispatch = useDispatch()
  
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    const anecdote1= anecdotes.find((n) => n.id === id)
    dispatch(setNotification(`You voted for: ${anecdote1.content}`))
    setTimeout (() => {
        dispatch(removeNotification())
    }, 5000)
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
