import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_BOOK= gql`
mutation createBook($title: String!, $author:String!, $published: Int!,  $genres:[String!]!)
{
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
  ){
    title
    author{
      name
    }
    published
    id
    genres
  }
}
`

const ALL_AUTHORS = gql`
query {
  allAuthors{
    name
    id
    born
    bookCount
  }
}
`

const ALL_BOOKS= gql`
query{
  allBooks{
    title
    author{
      name
    }
    published
    id
  }
}
`

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook]= useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
    refetchQueries: [{query: ALL_AUTHORS}],
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(response.data.addBook),
        }
      })
    },
  })

  if (!props.show) {
    return null
  }

 

  const submit = async (event) => {
    event.preventDefault()

   // Convert the string input to an integer using parseInt
    const publishedInt = parseInt(published, 10) 

    createBook({variables: {title, published:publishedInt, author, genres}})

    console.log('add book...')

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook