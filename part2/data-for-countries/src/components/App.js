import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Input = ({text, value, onChange}) => {
    return(
        <div>
            {text}<input value= {value} onChange= {onChange} />
        </div>
    )
}

const Display = ({filteredCountries}) => {
    //if (filteredCountries === 0){
        //return (
            //<div></div>
        //)

      
            
   if(filteredCountries.length > 10){
        console.log("filteredCountries length ia " + filteredCountries.length);
        //setFilteredCountries(0);
        filteredCountries = [];
        return(
            <div>Too many matches, specify another filter</div>
        )

    }else if(filteredCountries.length >= 2){
        return(
            <div>
                <List arr= {filteredCountries} />
            </div>
        )

    }else if(filteredCountries.length === 1){
        //console.log("one");
        console.log(filteredCountries);
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
    }else{
        return(
            <div></div>
        )
    }
    
}

const List = ({arr}) => {
    return(
        <div>
            <ul>
                {arr.map(item=>
                    <Country key= {item["name"]} item= {item} />

                )}
            </ul>
        </div>
    )
}

const Country =({item}) => <li>{item["name"]}</li>

const App = () => {
    const[searchItem, setSearchItem] = useState('');
    const [countries, setCountries] = useState([]);
    //const [filteredCountries, setFilteredCountries] = useState([]);
    //const filteredCountries = 0
    //;

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
        //console.log(event.target.value);
        setSearchItem(event.target.value);
        //const reg= new RegExp(event.target.value.toUpperCase());
        //const reg= new RegExp(searchItem.toUpperCase());
        //onsole.log("reg is" + reg);
        //setFilteredCountries(countries.filter(country => reg.test(country["name"].toUpperCase())))
        //setSearchItem("");
        console.log(searchItem);
    }

    return (
        <div>
           <Input text= "find countries"  value= {searchItem} onChange= {handleSearchItemFilter} />
           {searchItem === '' ? null :<Display filteredCountries= {filteredCountries} /> }
        </div>
    )
}

export default App