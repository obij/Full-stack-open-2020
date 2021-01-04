import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => <h1>{props.text}</h1>

const Button = ({handleClick, text}) => (
  <button onClick= {handleClick}>{text}</button>
)

const Statistic = ({text1, countOrNum, text2}) => <p>{text1} {countOrNum} {text2}</p>

const Statistics = ({countOrNum1, countOrNum2, countOrNum3, countOrNum4, countOrNum5, countOrNum6}) => {
  if(countOrNum1 === 0 && countOrNum2 === 0 && countOrNum3 === 0){
    return(
      <div>
        "No feedback given"
      </div>
    )
  }

  return (
    <div>
      <Statistic text1= "good" countOrNum= {countOrNum1} text2= ""/>
      <Statistic text1= "neutral" countOrNum= {countOrNum2} text2= ""/>
      <Statistic text1= "bad" countOrNum= {countOrNum3} text2= ""/>
      <Statistic text1= "all" countOrNum= {countOrNum4} text2= "" />
      <Statistic text1= "average" countOrNum= {countOrNum5} text2= "" />
      <Statistic text1= "positive" countOrNum= {countOrNum6} text2= "%" />
    </div>
  )
}

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
      <Statistics countOrNum1= {good} countOrNum2= {neutral} countOrNum3= {bad} countOrNum4= {good + neutral + bad} countOrNum5= {calcAverage()} countOrNum6= {calcPositive()} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)