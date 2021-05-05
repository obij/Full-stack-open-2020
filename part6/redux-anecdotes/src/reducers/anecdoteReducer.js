const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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

//console.log("anecdotesAtStart is ", anecdotesAtStart.sort(compare_votes("votes", "desc")))
//const initialState = anecdotesAtStart.map(asObject)
const initialState= anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
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

export const createAnecdote = (anecdote) => {
  return{
    type: 'NEW_ANECDOTE',
    data: {
      content: anecdote,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer