//onst blog = require("../models/blog")

const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes =(blogs) => {
  let countLikes= 0
  blogs.forEach(blog => {
    countLikes += blog.likes
  })
  return countLikes

}

const favoriteBlog =(blogs) => {
  let blogsCopy = [... blogs]
  blogsCopy.map((blog) => {
    delete blog._id
    delete blog.url
    delete blog.__v

  })

  let maxLikesBlog = {
    title: '',
    author: '',
    likes: 0
  }

  blogsCopy.forEach((blog) => {
    if(blog.likes > maxLikesBlog.likes){
      maxLikesBlog = { ...blog }
    }
  })
  //console.log('maxLikesBlog is ', maxLikesBlog);

  return maxLikesBlog
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}