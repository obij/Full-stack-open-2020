import React, { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, user, addLike, deleteBlog, postedByArr }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)

  //const [postedByCount, setPostedByCount]= useState(0)

  //console.log("blog is ", blog)
  //console.log("blog.user.username is ", blog.user.username)
  //console.log("user.username is ", user.username)
  if (blog.user.username === user.username) {
    //setPostedBy(true)
    //add blog tile to poseedByArr if above equal
    postedByArr.push(blog.title)
  }
  //console.log("blog.user is ", blog.user)
  //console.log("user: ", blog.user ? true: false )

  //update postedBy to enable any future delete
  //setPostedBy(blog.user.username)

  const updateLike = () => {
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
    }
    addLike(blog.id, updatedBlog)
  }

  const removeBlog = () => {
    const id = blog.id

    deleteBlog(id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} data-blog-id= "blog" className="blog">
      {showBlogDetails === false ? (
        <span>
          {blog.title} {blog.author}
          <button data-viewButton-id= "view" onClick={() => setShowBlogDetails(true)}>view</button>
        </span>
      ) : (
        <div>
          <span>
            {blog.title} {blog.author}{' '}
            <button onClick={() => setShowBlogDetails(false)}>hide</button>
          </span>{' '}
          <BlogDetails
            blog={blog}
            user={user}
            updateLike={updateLike}
            removeBlog={removeBlog}
            postedByArr={postedByArr}
          />{' '}
        </div>
      )}
    </div>
  )
}

export default Blog
