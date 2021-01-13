import React from 'react'
import Button from './Button'

const Person = ({person, deletePersonObject}) => <li>{person.name} {person.number}<Button deletePersonObject= {deletePersonObject} personId= {person.id} personName= {person.name} /></li>

export default Person
