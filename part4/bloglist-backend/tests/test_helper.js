const Blog= require('../models/blog')

const initialBlogs = [
  { title: 'The Sunshine Blog',
    author: 'Kc Sunshine',
    url: 'www.sunshineblog.com',
    likes: 2
  },
  {
    title: 'The maths blog',
    author: 'Kevin Devlin',
    url: 'www.mathsblog.com',
    likes: 4
  }
]

const blogsInDb = async () => {
  const blogs= await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports= {
  initialBlogs, blogsInDb
}