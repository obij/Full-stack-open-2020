import React from 'react'
import Input from '../components/Input'

const Filter = ({text, value, onChange}) => {
  return (
    <div>
      <Input text= {text} value= {value} onChange= {onChange} />
    </div>
  )
}

export default Filter
