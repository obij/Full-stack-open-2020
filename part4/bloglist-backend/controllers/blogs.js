const blogsRouter = require('express').Router()
const { response } = require('express')
const Blog= require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
//const helper= require('../tests/test_helper')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})



blogsRouter.post('/', async (request, response) => {
  //const blog = new Blog(request.body)
  const body= request.body

  //const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  //const user = await User.findById(body.userId)
  //const usersDb= await helper.usersInDb()
  //const user= usersDb[0]
  //const users= await User.find({})
  //const user= users[0]

  if(!body.likes){
    body.likes= 0
  }
  const blog= new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
    //user: user.id
  })

  //blog
  //  .save()
  //  .then(result => {
  //    response.status(201).json(result)
  //  })
  //  .catch(error => next(error))
  const savedBlog= await blog.save()
  user.blogs= user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
  const body= request.body

  const blog= {
    likes: body.likes,
  }

  const updatedBlog= await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})


module.exports = blogsRouter