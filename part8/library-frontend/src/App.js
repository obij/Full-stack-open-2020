import { useState } from 'react'
import { gql, useQuery, useApolloClient, useSubscription} from '@apollo/client'
import Authors from './components/Authors'
//import Books from './components/Books'
import Books2 from './components/Books2'
import Books3 from './components/Books3'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

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
    genres
    id
  }
}
`

const BOOK_ADDED= gql`
  subscription {
    bookAdded {
      title
      author{
      name
      }
      published
      genres
      id
    }
  }

`
// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByTitle(allPersons.concat(addedBook)),
    }
  })
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const result= useQuery(ALL_AUTHORS)
  const result2= useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      //console.log(data.data.bookAdded)
      const addedBook= data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  if(result.loading){
    return <div>loading...</div>
  }

  if(result2.loading){
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Authors show={page === 'authors'} authors= {result.data.allAuthors} />
        <Books3 show={page === 'books'} books= {result2.data.allBooks}/>
        {page === 'login' && <LoginForm setToken={setToken} />}
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} authors= {result.data.allAuthors} />

      {page === 'books' && <Books2 show={true} books={result2.data.allBooks} />}
      {page === 'add' && <NewBook show={true} />}
      {page === 'recommend' && <Recommend show={true} books={result2.data.allBooks} />}

    </div>
  )
}

export default App
