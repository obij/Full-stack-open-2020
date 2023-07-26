import React from 'react'

const InputBlogField = ({
  value,
  type,
  name,
  id,
  onChange,
  label,
  htmlFor,
}) => {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
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