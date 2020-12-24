import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => <h1>{props.text}</h1>

const Button = ({handleClick, text}) => (
  <button onClick= {handleClick}>{text}</button>
)

const Feedback = ({text1, count}) => <p>{text1} {count}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood = (feedback) => setGood(feedback)
  const incNeutral = (feedback) => setNeutral(feedback)
  const incBad = (feedback) => setBad(feedback)

  return (
    <div>
      <Display text= "give feedback" />
      <Button handleClick ={() => incGood(good + 1)} text= "good" />
      <Button handleClick ={() => incNeutral(neutral + 1)} text= "neutral" />
      <Button handleClick ={() => incBad(bad + 1)} text= "bad" />
      <Display text= "statistics" />
      <Feedback text1= "good" count= {good} />
      <Feedback text1= "neutral" count= {neutral} />
      <Feedback text1= "bad" count= {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)