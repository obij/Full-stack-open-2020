import React, { useState } from 'react'

const Person = ({person}) => <li>{person.name} {person.number}</li>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filteredNameArr, setFilteredNameArr]= useState(0);
  const [filteredName, setFilteredName]= useState("");

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
    <div>
        filter names with: <input value= {filteredName} onChange= {handleNameFilter} />
    </div>
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
         { filteredNameArr === 0
         ? persons.map(person => <Person key= {person.name} person= {person} />)
         : filteredNameArr.map(person => <Person key= {person.name} person= {person} />)
         }
        
     </ul>
</div>   
      
 )   
}

export default App