//onst blog = require("../models/blog")

//const { delete } = require("../app")

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

//helper function for mostBlogs function
const getMaxBlogsAuthor = (blogObjectsArr) => {
  let maxBlogsAuthor = {
    author: '',
    title: '',
    blogs: 0
  }

  blogObjectsArr.forEach((obj) => {
    if(obj.blogs > maxBlogsAuthor.blogs){
      maxBlogsAuthor= { ...obj }
    }
  })
  return maxBlogsAuthor
}

const mostBlogs = (arrBlogs) => {
  const arrBlogsCopy= [...arrBlogs]

  arrBlogsCopy.forEach((obj) => {
    obj.blogs= 0
    obj.checked= false
    delete obj.likes
    delete obj.url
    delete obj._id
    delete obj.__v
  })

  arrBlogsCopy.forEach((obj) => {
    if(obj.checked === false){
      obj.blogs = obj.blogs + 1
      obj.checked = true
      arrBlogsCopy.forEach((obj2) => {
        if(obj2.checked === false && obj2.author === obj.author){
          obj.blogs = obj.blogs + 1
          obj2.checked= true
        }
      })
    }
  })
  //filter out objects whose blog key valuea are o
  //console.log('arrBlogsCopy is ', arrBlogsCopy)
  const filteredArrBlogs= arrBlogsCopy.filter((obj => obj.blogs !== 0))
  let maxBlogsObject = getMaxBlogsAuthor(filteredArrBlogs)

  delete maxBlogsObject.title
  delete maxBlogsObject.checked
  return maxBlogsObject
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}

