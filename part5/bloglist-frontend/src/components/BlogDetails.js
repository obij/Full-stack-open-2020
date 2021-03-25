import React from 'react'
import Button from './Button'

const BlogDetails = ({blog, blogDetailsArr, user}) => {
    const filteredBlog = blogDetailsArr.filter((blogItem) => blogItem.title === blog.title)

    return(
        <div>
            {filteredBlog.url}
            likes 0 <Button text= "like"/>
            {user.name}
        </div>
    )
}



export default BlogDetails