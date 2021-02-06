const blogsRouter = require('express').Router()
const Blog= require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.post('/', (request, response, next) => {
  //const blog = new Blog(request.body)
  const body= request.body
  const blog= new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})


module.exports = blogsRouter