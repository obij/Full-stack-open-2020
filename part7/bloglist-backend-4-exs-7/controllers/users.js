const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password.length < 3 || !body.password){
    return response.status(400).json({ error: 'password missing or invalid' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

// Add a new route to retrieve a specific user by ID
usersRouter.get('/:id', async (request, response) => {
  const userId = request.params.id
  const user = await User.findById(userId).populate('blogs', { url: 1, title: 1, author: 1 })

  if (!user) {
    return response.status(404).json({ error: 'User not found' })
  }

  response.json(user)
})

module.exports = usersRouter