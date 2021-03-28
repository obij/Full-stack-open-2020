import React from 'react'
import Button2 from './Button2'

const BlogDetails = ({blog, user, updateLike,  removeBlog, postedByArr}) => {
   // const filteredBlog = blogDetailsArr.filter((blogItem) => blogItem.title === blog.title)
    //console.log("filteredBlog is ", filteredBlog)
    //console.log("blogDetailsArr is", blogDetailsArr)
   // console.log("user.username is ", user.username)
    //console.log("postedBy is ", postedBy)

    return(
        <div>
            <div>{blog.url}</div>
            likes {blog.likes} <Button2 text= "like" onClick= {updateLike}/>
            {user.name}
            {postedByArr.includes(blog.title) === true ? <Button2 text= "remove" onClick= {removeBlog} /> : null} 
        </div>
    )
}



export default BlogDetails