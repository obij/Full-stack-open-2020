import React from 'react'
import Person from '../components/Person'

const Persons = ({filteredNameArr, persons, filteredName}) => {
    return (
        <div>
            <ul>
               { filteredName === ""
                 ? persons.map(person => <Person key= {person.name} person= {person} />)
                 : filteredNameArr.map(person => <Person key= {person.name} person= {person} />)
               }
        
            </ul>
        </div>
    )
}

export default Persons
