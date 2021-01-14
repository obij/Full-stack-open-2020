import React, { useState, useEffect } from 'react'
import Filter from '../components/Filter'
import PersonForm from '../components/PersonForm'
import Persons from '../components/Persons'
import noteService from '../services/notes'
import Notification from '../components/Notification'




const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filteredName, setFilteredName]= useState("");
  const [notification, setNotification] = useState("")
  
  useEffect(() =>{
      //console.log('effect')
      noteService
          .getAll()
          .then(initialPersons => {
              //console.log('promise fulfilled');
              setPersons(initialPersons)
          })
  }, [])
  //console.log('render', persons.length, 'persons');

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
          if(arr[i].name === obj.name && arr[i].number === obj.number){
              found = true;
              return found;
          }
      }
      return found;
  }

  const containsObjWithDiffNo =(arr, obj) => {
    let found = false;
    for(let i= 0; i < arr.length; i++){
        if(arr[i].name === obj.name && arr[i].number !== obj.number){
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
          alert(`${newName} with number ${newNumber}  already added to phonebook`)

     }else if(containsObjWithDiffNo(persons, nameObject)){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
            const samePersonWithDiffNo=  persons.find(p => p.name === nameObject.name && p.number !== nameObject.number);
            const changedPerson = {...samePersonWithDiffNo, number: nameObject.number};
            noteService
                .update(samePersonWithDiffNo.id, changedPerson)
                .then(returnedPerson => {
                    setPersons(persons.map(person => 
                       person.id !== samePersonWithDiffNo.id ? person : returnedPerson))
                    setNotification(`'${returnedPerson.number}' was successfully updated for Person  '${returnedPerson.name}'`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)   
                })
                .catch(error => {
                    alert(`The person ${samePersonWithDiffNo.name}' was already deleted from server`)
                    setPersons(persons.filter(n =>
                       n.id !== samePersonWithDiffNo.id))
                })
        }

      }else{
         // setPersons(persons.concat(nameObject));
         noteService
         .create(nameObject)
         .then(returnedPerson => {
             setPersons(persons.concat(returnedPerson));
             setNotification(`Person '${returnedPerson.name}' was successfully added to phonebook`)
             setTimeout(() => {
                 setNotification(null)
             }, 5000)
         })
     }
      setNewName("");
      setNewNumber("");
      setFilteredName("")
  }

  const deletePersonObject = (id, name) => {
      if(window.confirm(`Delete ${name}`)){
          const deletedPerson = persons.find(p => p.id=== id)

          noteService
             .updateDelete(id, deletedPerson)
             .then(returnedPerson => {
                 setPersons(persons.filter (person => person.id !== returnedPerson.id))
             })
      }
  }
 
  //console.log(filteredNameArr);

 
 return(
     <div>
         <h2>Phonebook</h2>
         <Notification message= {notification} />
         <Filter text= "Filter names with: " value= {filteredName} onChange= {handleNameFilter} />
         <h3>Add a new</h3>
         <PersonForm addName= {addName} text1= "name: " value1= {newName} onChange1= {handleNameChange} text2= "number: " value2= {newNumber} onChange2= {handleNumberChange} />
         <h3>Numbers</h3>
         <Persons filteredNameArr= {filteredNameArr} persons= {persons} filteredName= {filteredName} deletePersonObject ={deletePersonObject}/>
     </div>

 )
}

export default App