import { useState } from "react"
import { gql, useMutation } from '@apollo/client'

const EDIT_AUTHOR= gql`
mutation editAuthor($name: String!, $setBornTo: Int!){
  editAuthor(name: $name, setBornTo: $setBornTo){
    name
    born
    id
  }
}
`



const Authors = (props) => {
  const [name, setName]= useState('')
  const [setBornTo, setSetBornTo]= useState(null)

  const [editAuthor]= useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }
  //console.log(props.authors)
  const authors = props.authors

  const existingAuthors= authors.map((author)=> author.name)

  const submit= (event) => {
    event.preventDefault()

    //const setBornToInt= parseInt(setBornTo, 10)
    editAuthor({variables: {name, setBornTo}})

    console.log('edit author...')
    setName('')
    setSetBornTo(null)
  }

  

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set Birthyear</h2>

        <form onSubmit={submit}>
        <div>
          {/* Use a select dropdown to show existing authors */}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="">Select an author</option>
            {existingAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>
        <div>
          born{" "}
          <input
            value={setBornTo !== null ? setBornTo : ""}
            onChange={({ target }) => setSetBornTo(parseInt(target.value, 10))}
          />
        </div>
        <button type="submit" disabled={!name || setBornTo === null}>
          update author
        </button>
      </form>
      </div>
    </div>
  )
}

export default Authors
