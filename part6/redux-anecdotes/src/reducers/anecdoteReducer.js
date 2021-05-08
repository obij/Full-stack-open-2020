//const getId = () => (100000 * Math.random()).toFixed(0)
import anecdoteService from '../components/services/anecdotes'

function compare_votes(property,order) {
  var sort_order = 1;
  if(order === "desc"){
      sort_order = -1;
  }
  return function (a, b){
      // a should come before b in the sorted order
      if(a[property] < b[property]){
              return -1 * sort_order;
      // a should come after b in the sorted order
      }else if(a[property] > b[property]){
              return 1 * sort_order;
      // a and b are the same
      }else{
              return 0 * sort_order;
      }
  }
}



const anecdoteReducer = (state =[], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE_ANECDOTE': {
      //const id= action.data
      const id = action.data.id
      const votedAnecdote= state.find(anecdote => anecdote.id === id)
      const upvotedAnecdote= {...votedAnecdote, votes: votedAnecdote.votes + 1}
      //console.log('votedAnecdote is',  votedAnecdote)
      //console.log('upvotedAnecdote is ', upvotedAnecdote)

     const changedState= state.map(anecdote2 => anecdote2.id !== id ? anecdote2 : upvotedAnecdote)
     const modifiedState=  changedState.sort(compare_votes("votes", "desc"))
     //console.log('modified state is ', modifiedState)
     return modifiedState
    }
    case 'NEW_ANECDOTE': {
      return state.concat(action.data)
    }
    case 'INIT_ANECDOTES':
      return action.data
    // eslint-disable-next-line no-fallthrough
    default:
      return state
  }
}

export const voteAnecdote = (id) => {
  return{
    type: 'VOTE_ANECDOTE',
    //data: id
    data: {id}
  }
}

export const createAnecdote = (data) => {
  return{
    type: 'NEW_ANECDOTE',
    data,
  }
}



export const initializeAnecdotes= () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer