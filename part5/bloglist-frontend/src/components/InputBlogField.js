import React from 'react'

const InputBlogField = ({ value, type, name, id, onChange }) => {
  return (
    <div>
      <input
        value={value}
        type={type}
        name={name}
        id={id}
        onChange={onChange}
      />
    </div>
  )
}

export default InputBlogField
