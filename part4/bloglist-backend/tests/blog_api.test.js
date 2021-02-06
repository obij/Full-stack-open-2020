const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
//jest.useFakeTimers()

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Any added valid blog has a valid id', async () => {
  const newBlog = {
    title: 'The new times Blog',
    author: 'Ben Richard',
    url: 'www.newtimesblog.com',
    likes: 2
  }

  const newBlogTitle = newBlog.title

  await api
    .post('/api/blogs')
    .send(newBlog)
    //.expect(200)
    .expect('Content-Type', /application\/json/)

  const response= await api.get('/api/blogs')

  const expectedItem= response.body.filter(item => item.title === newBlogTitle)
  //console.log('expectedItem is ', expectedItem)
  const expectedId = expectedItem[0].id
  expect(expectedId).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})

//jest -t 'blog_api.test'
//npm test -- tests/blog_api.test.js
//npm test -- -t 'Any added valid blog has a valid id'