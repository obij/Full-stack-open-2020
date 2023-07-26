import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BlogDetails from './BlogDetails'
import blogService from '../services/blogs'

const Blog = ({  user, addLike, deleteBlog, postedByArr }) => {
  const [blog, setBlog] = useState(null)
  //const [showBlogDetails, setShowBlogDetails] = useState(false)

  //const [postedByCount, setPostedByCount]= useState(0)

  //console.log("blog is ", blog)
  //console.log("blog.user.username is ", blog.user.username)
  //console.log("user.username is ", user.username)

  const blogId = useParams().id
  console.log(blogId)
  //console.log(typeof blogId)
  //console.log(typeof Number(blogId))
  //console.log(typeof blogsState[0].id)

  // Now, you can find the corresponding blog using the id
  //const blog = blogsState.find((blog) => blog.id === blogId)

  /*useEffect(() => {
    const selectedBlog = blogsState.find((blog) => blog.id === blogId)
    console.log(selectedBlog)
    setBlog(selectedBlog)
  }, [blogsState, blogId])*/

  useEffect(() => {
    if(blogId) {
      blogService.getBlogById(blogId)
        .then((blogDetails) => {
          console.log(blogDetails)
          setBlog(blogDetails)
        })
        .catch((error) => {
          console.error('Error fetching blog details:', error)
        })
    }
  }, [blogId])




  if(!blog){
    return null
  }

  //console.log(Number(blogId))
  //console.log(blogsState)
  //console.log(blog)
  console.log(user.username)

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
      ...blog,
      likes: blog.likes + 1,
    }
    // Update the backend with the new likes count
    addLike(blog.id, updatedBlog)

    // Fetch the updated blog details from the server after the like is added
    blogService
      .getBlogById(blog.id)
      .then((blogDetails) => {
        setBlog(blogDetails)
      })
      .catch((error) => {
        console.error('Error fetching updated blog details:', error)
      })
  }

  /*const updateLike = () => {
    const updatedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
    }
    addLike(blog.id, updatedBlog)
    // Update the blog object in the state with the new like count
    setBlog(updatedBlog)
  }*/

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
      <h2>{blog.title} {blog.author}</h2>
      <BlogDetails
        blog={blog}
        updateLike={updateLike}
        removeBlog={removeBlog}
        postedByArr={postedByArr}
      />
    </div>
  )
  /*return (
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
  )*/
}

export default Blog