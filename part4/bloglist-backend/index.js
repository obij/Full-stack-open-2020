const http = require('http')
const express = require('express')
const app = express()
require('dotenv').config()
const Blog= require('./models/blog')
const cors = require('cors')


app.use(cors())
app.use(express.json())
app.use(express.static('build'))


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)


app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})




app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })

  }

  next(error)
}

app.use(errorHandler)

const server = http.createServer(app)

const PORT = 3003
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})