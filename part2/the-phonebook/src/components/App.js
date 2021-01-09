import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'




const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filteredNameArr, setFilteredNameArr]= useState(0);
  const [filteredName, setFilteredName]= useState("");
  
  useEffect(() =>{
      console.log('effect')
      axios
          .get('http://localhost:3001/persons')
          .then(response => {
              console.log('promise fulfilled');
              setPersons(response.data)
          })
  }, [])
  console.log('render', persons.length, 'persons');

  const handleNameFilter = (event) => {
      setFilteredName(event.target.value);

      let r = "^";
      //r += filteredName.toUpperCase();
      r += event.target.value.toUpperCase();
      let reg = new RegExp(r);
      //console.log(reg);
      setFilteredNameArr(persons.filter(person => reg.test(person.name.toUpperCase())))
      //console.log(filteredNameArr);

      //if(filteredName === ""){
          //setFilteredNameArr(0)
          //reg = / /;
      //}
  }

  const handleNumberChange = (event) => {
      //console.log(event.target.value);
      setNewNumber(event.target.value);
  }

  const handleNameChange = (event) => {
      //console.log(event.target.value);
      setNewName(event.target.value);
  }

  const containsObj =(arr, obj) => {
      let found = false;
      for(let i= 0; i < arr.length; i++){
          if(arr[i].name === obj.name){
              found = true;
              return found;
          }
      }
      return found;
  }

  const addName = (event) => {
      event.preventDefault();
      const nameObject = {
          name: newName,
          number: newNumber
      }

     if(containsObj(persons, nameObject)){
          //console.log("includes object");
          alert(`${newName} is already added to phonebook`)
      }else{
          setPersons(persons.concat(nameObject));
      }
      setNewName("");
      setNewNumber("");
      setFilteredNameArr(0);
      setFilteredName("")
  }
 
  //console.log(filteredNameArr);

 
 return(
     <div>
         <h2>Phonebook</h2>
         <Filter text= "Filter names with: " value= {filteredName} onChange= {handleNameFilter} />
         <h3>Add a new</h3>
         <PersonForm addName= {addName} text1= "name: " value1= {newName} onChange1= {handleNameChange} text2= "number: " value2= {newNumber} onChange2= {handleNumberChange} />
         <h3>Numbers</h3>
         <Persons filteredNameArr= {filteredNameArr} persons= {persons} />
     </div>

 )
}

export default App