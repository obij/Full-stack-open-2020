import React from 'react'
import Person from '../components/Person'

const Persons = ({filteredNameArr, persons, filteredName, deletePersonObject}) => {
    return (
        <div>
            <ul>
               { filteredName === ""
                 ? persons.map(person => <Person key= {person.name} person= {person} deletePersonObject= {deletePersonObject} />)
                 : filteredNameArr.map(person => <Person key= {person.name} person= {person} deletePersonObject= {deletePersonObject} />)
               }
        
            </ul>
        </div>
    )
}

export default Persons
