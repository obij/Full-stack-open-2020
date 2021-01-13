import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'




const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState("")
  const [newNumber, setNewNumber] = useState("")
  //const [filteredNameArr, setFilteredNameArr]= useState(0);
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

  const filteredNameArr = persons.filter(person => {
      let r= "^";
      r += filteredName.toUpperCase();
      let reg = new RegExp(r);
      return reg.test(person.name.toUpperCase());
  })

  const handleNameFilter = (event) => {
      setFilteredName(event.target.value);
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
         // setPersons(persons.concat(nameObject));
         axios
            .post('http://localhost:3001/persons', nameObject)
            .then(response => {
                setPersons(persons.concat(response.data));
            })
      }
      setNewName("");
      setNewNumber("");
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
         <Persons filteredNameArr= {filteredNameArr} persons= {persons} filteredName= {filteredName}/>
     </div>

 )
}

export default App