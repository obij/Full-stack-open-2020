import { gql, useQuery} from '@apollo/client'

const CURRENT_USER= gql`
  query {
    me{
        username,
        favoriteGenre,
        id
    }
  }

`
const Recommend= (props) => {
    const result = useQuery(CURRENT_USER)

    if(result.loading){
        return<div>loading...</div>
    }

    const favoriteGenre= result.data.me.favoriteGenre
    const books= props.books

    const recommendedBooks= books.filter((book) => book.genres.includes(favoriteGenre))

    return(
        <div>
            <h2>recommendations</h2>
            <p>Books in your favorite genre: <b>{favoriteGenre}</b></p>

            <table>
             <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
             </tr>
            {recommendedBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
    )
}

export default Recommend