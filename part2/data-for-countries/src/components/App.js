import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Display from '../components/Display'
import Input from '../components/Input'



const App = () => {
    const[searchItem, setSearchItem] = useState('');
    const [countries, setCountries] = useState([]);
    


    const filteredCountries= countries.filter(country => {
        const reg= new RegExp(searchItem.toUpperCase());
        //console.log(reg)
        return reg.test(country["name"].toUpperCase())
    })

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.eu/rest/v2/')
            .then(response => {
                console.log('promise fulfilled');
                setCountries(response.data);
            })
    }, [])
    console.log('render', countries.length, 'countries');

    const handleSearchItemFilter = (event) => {
        console.log(event.target.value);
        setSearchItem(event.target.value);
    }

    const handleClick =(countryName) => () =>  {
       setSearchItem(countryName);
       console.log("filteredCountries.length is", filteredCountries);
    }

    

    return (
        <div>
           <Input text= "find countries"  value= {searchItem} onChange= {handleSearchItemFilter} />
           {searchItem === '' ? null :<Display filteredCountries= {filteredCountries} handleClick= {handleClick} /> }
        </div>
    )
}

export default App


