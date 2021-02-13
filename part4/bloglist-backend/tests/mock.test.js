const mongoose = require('mongoose')
const helper= require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog= require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
//jest.useFakeTimers()

let token= null
//let savedToken= null
beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject= new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject= new Blog(helper.initialBlogs[1])
  await blogObject.save()

  await User.deleteMany({})
  //const passwordHash= await bcrypt.hash('sekret', 10)
  //const user= new User({ username: 'root', passwordHash })
  //await user.save
  await api
    .post('/api/users')
    .send({ username:'Jhn', password:'sekret', name: 'John' })


  //user logs in to generate a token
  const response= await api.post('/api/login').send({ username: 'Jhn', password: 'sekret' })
  token= response.body.token
  //console.log('token is', token)
  //savedToken= token
})

describe('deletion of a blog', () => {
  test('successfully deletes if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    //console.log('blogToDelete is ', blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      //.expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    console.log('blogsAtEnd has length ', blogsAtEnd.length)
    //console.log('helper.initialBlogs has length', helper.initialBlogs.length)
    console.log('blogsAtStart has length ', blogsAtStart.length)


    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

//npm test -- tests/mock.test.js