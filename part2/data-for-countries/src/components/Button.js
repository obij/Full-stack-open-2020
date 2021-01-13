import React from 'react'

const Button = ({country, handleClick}) => {
    return(
         <div>
             <button onClick= {handleClick(country["name"])}>show</button>
         </div>
     )
 }

export default Button
