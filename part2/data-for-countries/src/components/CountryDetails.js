import React from 'react'
import List from '../components/List'

const CountryDetails= ({filteredCountries}) =>{
    return(
        <div>
            <h1>{filteredCountries[0]["name"]}</h1>
            <div>capital {filteredCountries[0]["capital"]}</div>
            <div>population {filteredCountries[0]["population"]}</div>
            <h2>languages</h2>
               <List arr= {filteredCountries[0]["languages"]} />
               <img src = {filteredCountries[0]["flag"]} width="200" height="200" alt= "The flag of a country" ></img>
        </div>
    )
}


export default CountryDetails
