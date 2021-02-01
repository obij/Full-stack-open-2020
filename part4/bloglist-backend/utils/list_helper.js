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

module.exports = {
  dummy, totalLikes
}