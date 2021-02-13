const blogsRouter = require('express').Router()
const { response, request } = require('express')
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
  console.log('decodedToken is ', decodedToken)
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

  response.json(savedBlog).status(201)
  //response.status(204).end()
})



blogsRouter.delete('/:id', async(request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const blog= await Blog.findById(request.params.id)
  const { id } = request.params
  //console.log(typeof blog.user.id.toString('ascii'))
  //let blogAscii = blog.user.id.toString('ascii')
  //let blogConverted= String.fromCharCode(blogAscii)
  //console.log('blogConverted is ', blogConverted)
  //console.log(typeof blogConverted)

  //if(decodedToken.id.toString() === JSON.stringify(blog.user.id)){
  //await Blog.findByIdAndRemove(request.params.id)
  //response.status(204).end()
  //}else{
  //response.status(400).end()
  //}
  const user = await User.findById(decodedToken.id)


  if (blog.user.toString() === user._id.toString()) {
    //console.log('blog.user.toString() is ', blog.user.toString)
    //console.log('user._id.toString() is', user._id.toString())
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    response
      .status(401)
      .json({ error: 'You are not authorized to delete this blog' })
  }
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