import React, { useState } from 'react'
import blogService from '../services/blogs'

/*const Comments = ({ blog }) => {
  const [comments, setComments] = useState([])

  setComments(blog.comments)

  if (comments.length === 0){
    return (
      <div>
        <h3>Comments</h3>
      </div>
    )

  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment, index) => {
          <li key={index}>
            {comment}
          </li>
        })}
      </ul>
    </div>
  )
}*/

const Comments= ({ blog }) => {
  const [comment, setComment]= useState('')
  const [comments, setComments] = useState(blog.comments)

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = async(event)   => {
    event.preventDefault()
    try{
      const updatedComments= [...comments, comment]
      //const updatedComments= [...blog.comments, comment]
      await blogService.addComment(blog.id, { comments: updatedComments })
      setComments(updatedComments)
      setComment('')

    }catch(error){
      console.error('Error adding comment:', error)
    }
  }
  if(blog.comments.length === 0){
    return (
      <div>
        <h3>Comments</h3>
        <form onSubmit={addComment}>
          <input type="text" value={comment} onChange={handleCommentChange} />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    )
  }

  return(
    <div>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input type="text" value={comment} onChange={handleCommentChange} />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )

}

/*const Comments = ({ blog }) => {
  if (blog.comments.length === 0) {
    return (
      <div>
        <h3>Comments</h3>
      </div>
    )
  }

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}*/


export default Comments