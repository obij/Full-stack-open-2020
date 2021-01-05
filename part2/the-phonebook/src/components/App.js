import React, { useState } from 'react'

const Person = ({person}) => <li>{person.name}</li>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

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
          name: newName
      }

     if(containsObj(persons, nameObject)){
          console.log("includes object");
          alert(`${newName} is already added to phonebook`)
      }else{
          setPersons(persons.concat(nameObject));
      }
      setNewName("");
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit= {addName}>
        <div>
          name: <input value={newName} onChange= {handleNameChange} />
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