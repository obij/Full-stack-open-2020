import React from 'react'

const Button2 = ({ text, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

// eslint-disable-next-line semi
export default Button2
