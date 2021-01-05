import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({handleClick, text}) =>{
  return(
    <button onClick= {handleClick}>{text}</button>
  )
}

const Display= ({text1, text2, text3}) => {
  return(
    <div>{text1} {text2} {text3} </div>
  )
}

const Title = ({text}) => <h1>{text}</h1>

const MostVotes = ({anecdotes, mostVotesIndex, text1, text2, text3, votes, text4}) => {
  if(votes[0] === 0 && votes[1] === 0 && votes[2] === 0 && votes[3] === 0 && votes[4] === 0 && votes[5] === 0){
    return(
      <div>No anecdote with most votes yet</div>
    )
  }

  return (
    <div>
      <Display text1= {anecdotes[mostVotesIndex]} text2= {text1} text3= {text2} />
      <Display text1= {text3} text2= {votes[mostVotesIndex]} text3= {text4} />
    </div>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes]= useState([0,0,0,0,0,0])

 
  const indexOfMax = (arr) => {
    if(arr.length === 0){
      return -1;
    }

    let max= arr[0];
    let maxIndex = 0;

    for (let i= 1; i < arr.length; i++){
      if(arr[i] > max){
        maxIndex = 1;
        max= arr[i];
      }
    }

    return maxIndex;
  }

  const mostVotesIndex = () => indexOfMax(votes)

  const incVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const dispVote = () => votes[selected]

  const getRandomInt = (min, max) =>{
    min= Math.ceil(min);
    max= Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const handleClick = () => {
    let randNum = getRandomInt(0, 6);
    setSelected(randNum);
  }

  return (
    <div>
      <Title text= "Anecdote of the day" />
      {props.anecdotes[selected]}
      <Display text1= "has" text2= {dispVote()} text3= "votes" />
      <Button handleClick= {incVote} text= "vote" />
      <Button handleClick= {handleClick} text= "next anecdote" />
      <Title text= "Anecdote with most votes" />
      <MostVotes anecdotes= {anecdotes} mostVotesIndex= {mostVotesIndex()} text1= "" text2= "" text3= "has" votes= {votes} text4= "votes" />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)