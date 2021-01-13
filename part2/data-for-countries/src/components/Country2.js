import React from 'react'
import Button from '../components/Button'

const Country2 = ({country, handleClick}) =>{
    return(
        <li>{country["name"]}<Button country= {country} handleClick= {handleClick} /></li>
    )
}

export default Country2
