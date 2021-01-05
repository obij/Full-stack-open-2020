import React, { useState } from 'react'

const Person = ({person}) => <li>{person.name} {person.number}</li>

const App = () => {
  const [ persons, setPersons ] = useState([
    {name: 'Arto Hellas', number: "040-1234567"}
  ]) 
  const [ newName, setNewName ] = useState("")
  const [newNumber, setNewNumber] = useState("")

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
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit= {addName}>
        <div>
          name: <input value={newName} onChange= {handleNameChange} />
        </div>
        <div>
            number: <input value= {newNumber} onChange= {handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       <ul>
           {persons.map(person =>
              <Person key= {person.name} person= {person} />
           )}
       </ul>
    </div>
  )
}

export default App