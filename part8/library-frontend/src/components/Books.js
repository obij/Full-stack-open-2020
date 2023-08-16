import React, { useState } from 'react';

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  if (!props.show) {
    return null
  }

  const books = props.books;
  //console.log("books is ", books)

  const allGenres = [...new Set(books.flatMap((book) => book.genres))];
  //console.log('allGenres is ', allGenres)

  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books
  
  return (
    <div>
      <h2>books</h2>

      <div>
        <button onClick={() => setSelectedGenre(null)}>All Genres</button>
        {allGenres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>

      {selectedGenre ? (
        <p>Books in genre: <b>{selectedGenre}</b></p>
      ) : (
        <p>All Genres</p>
      )}

      <table>
        {/* ... table body ... */}
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books
