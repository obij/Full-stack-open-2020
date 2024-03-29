import React from 'react'
import Button2 from './Button2'
import Comments from './Comments'

const BlogDetails = ({ blog,  updateLike, removeBlog, postedByArr }) => {
  // const filteredBlog = blogDetailsArr.filter((blogItem) => blogItem.title === blog.title)
  //console.log("filteredBlog is ", filteredBlog)
  //console.log("blogDetailsArr is", blogDetailsArr)
  // console.log("user.username is ", user.username)
  //console.log("postedBy is ", postedBy)

  return (
    <div>
      <div>{blog.url}</div>
      <span>likes</span> <span data-likes-id= "likes">{blog.likes}</span> <Button2 data-likeButton-id= "like"  text="like" onClick={updateLike} />
      added by: {blog.user.name}
      <Comments blog= {blog} />
      {postedByArr.includes(blog.title) === true ? (
        <Button2 text="remove" onClick={removeBlog} />
      ) : null}
    </div>
  )
}

export default BlogDetails