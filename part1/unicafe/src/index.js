import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => <h1>{props.text}</h1>

const Button = ({handleClick, text}) => (
  <button onClick= {handleClick}>{text}</button>
)



const Table =({countOrNum1, countOrNum2, countOrNum3, countOrNum4, countOrNum5, countOrNum6}) => {
  if(countOrNum1 === 0 && countOrNum2 === 0 && countOrNum3 === 0){
    return(
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <table>
       <thead>
        <tr>
          <td>good</td>
          <td>{countOrNum1}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{countOrNum2}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{countOrNum3}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{countOrNum4}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{countOrNum5}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{countOrNum6}%</td>
        </tr>
       </thead>
      </table>
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
      <Table countOrNum1= {good} countOrNum2= {neutral} countOrNum3= {bad} countOrNum4= {good + neutral + bad} countOrNum5= {calcAverage()} countOrNum6= {calcPositive()} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)