import React, { useState } from 'react'
import InputBlogField from './InputBlogField'
import Button from './Button'

const Form4Blog = ({ addBlog }) => {
  const [inputTitle, setInputTitle] = useState(null)
  const [inputAuthor, setInputAuthor] = useState(null)
  const [inputUrl, setInputUrl] = useState(null)

  const handleInputTitleChange = (event) => {
    //console.log(event.target.value)
    setInputTitle(event.target.value)
  }

  const handleInputAuthorChange = (event) => {
    //console.log(event.target.value)
    setInputAuthor(event.target.value)
  }

  const handleInputUrlChange = (event) => {
    //console.log(event.target.value)
    setInputUrl(event.target.value)
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    try {
      const title = inputTitle
      const author = inputAuthor
      const url = inputUrl
      const likes = 0

      const blog = {
        title,
        author,
        url,
        likes,
      }

      addBlog(blog)

      //reset the input values for title, author, url
      setInputTitle('')
      setInputAuthor('')
      setInputUrl('')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <InputBlogField
        type="title"
        name="title"
        id="title"
        value={inputTitle || ''}
        onChange={handleInputTitleChange}
        label="title"
        htmlFor="title"
      />
      <InputBlogField
        type="author"
        name="author"
        id="author"
        value={inputAuthor || ''}
        onChange={handleInputAuthorChange}
        label="author"
        htmlFor="author"
      />
      <InputBlogField
        type="url"
        name="url"
        id="url"
        value={inputUrl || ''}
        onChange={handleInputUrlChange}
        label="url"
        htmlFor="url"
      />
      <Button id= "form-button" type="submit" text="create" />
    </form>
  )
}

export default Form4Blog