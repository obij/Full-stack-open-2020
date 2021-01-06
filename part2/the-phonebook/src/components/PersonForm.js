import React from 'react'
import Input from '../components/Input'

const PersonForm = ({addName, text1, value1, onChange1, text2, value2, onChange2}) => {
  return (
    <div>
      <form onSubmit= {addName}>
          <Input text= {text1} value= {value1} onChange= {onChange1} />
          <Input text= {text2} value= {value2} onChange= {onChange2} />
          <div><button type="submit">add</button></div>
      </form>
      
    </div>
  )
}

export default PersonForm
