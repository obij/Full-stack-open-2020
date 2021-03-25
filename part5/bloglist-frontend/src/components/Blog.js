import React, { useState } from 'react'
import BlogDetails from './BlogDetails'

const Blog = ({ blog, blogDetailsArr, user }) => {
  const [showBlogDetails,  setShowBlogDetails]= useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick= {() => setShowBlogDetails(!showBlogDetails)}>view</button>
      {showBlogDetails === true ? <BlogDetails blog={blog} blogDetailsArr= {blogDetailsArr} user= {user} /> : null}
    </div>
  )
}
  


export default Blog
