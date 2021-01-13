import React from 'react'

const Button = ({deletePersonObject, personId, personName}) => {
    return (
        <div>
           <button onClick = {() => deletePersonObject(personId, personName)}>delete</button>
        </div>
    )
}

export default Button
