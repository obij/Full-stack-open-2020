import React from 'react'
import Country2 from '../components/Country2'

const List2= ({filteredCountries, handleClick})=>{
    return(
        <div>
            <ul>
                {filteredCountries.map(country =>
                  <Country2 key= {country["name"]} country= {country}  handleClick= {handleClick} />
                )}
            </ul>
        </div>
    )
}

export default List2
