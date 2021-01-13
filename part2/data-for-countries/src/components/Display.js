import React from 'react'
import CountryDetails from '../components/CountryDetails'
import List2 from '../components/List2'

const Display = ({filteredCountries, handleClick}) =>{
    if(filteredCountries.length > 10){
        return(
            <div>Too many matches, specify another filter</div>
        )
    
    }else if(filteredCountries.length >= 2){
        return(
            <div>
                <List2 filteredCountries= {filteredCountries}  handleClick= {handleClick}/>
            </div>
        )

    }else if(filteredCountries.length === 1){
        console.log("one");
        console.log(filteredCountries);
        return(
            <div>
                <CountryDetails filteredCountries= {filteredCountries} />
            </div>
        )
    }else{
		return(
            <div></div>
        )
	}
}


export default Display
