import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => <h1>{props.text}</h1>

const Button = ({handleClick, text}) => (
  <button onClick= {handleClick}>{text}</button>
)

const Feedback = ({text1, countOrNum, text2}) => <p>{text1} {countOrNum} {text2}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incGood = (feedback) => setGood(feedback)
  const incNeutral = (feedback) => setNeutral(feedback)
  const incBad = (feedback) => setBad(feedback)
  const calcAverage = () => good === 0 && neutral === 0 && bad === 0 ? 0 : ((good * 1) + (neutral * 0) + (bad * -1)) /(good + neutral + bad)
  const calcPositive = () => good === 0 && neutral === 0 && bad === 0 ? 0 : good/(good + bad + neutral) * 100

  return (
    <div>
      <Display text= "give feedback" />
      <Button handleClick ={() => incGood(good + 1)} text= "good" />
      <Button handleClick ={() => incNeutral(neutral + 1)} text= "neutral" />
      <Button handleClick ={() => incBad(bad + 1)} text= "bad" />
      <Display text= "statistics" />
      <Feedback text1= "good" countOrNum= {good} text2= ""/>
      <Feedback text1= "neutral" countOrNum= {neutral} text2= ""/>
      <Feedback text1= "bad" countOrNum= {bad} text2= ""/>
      <Feedback text1= "all" countOrNum= {good + neutral + bad} />
      <Feedback text1= "average" countOrNum= {calcAverage()} text2= "" />
      <Feedback text1= "positive" countOrNum= {calcPositive()} text2= "%" />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)