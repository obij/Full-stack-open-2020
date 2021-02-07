const mongoose = require('mongoose')
const helper= require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog= require('../models/blog')
//jest.useFakeTimers()

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject= new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject= new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added', async () => {
  const newBlog= {
    title: 'English lit blog',
    author: 'Johnny English',
    url: 'www.englishlitblog.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd= await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const titles= blogsAtEnd.map(b => b.title)
  expect(titles).toContain('English lit blog')
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

test('no likes defaults to 0', async () => {
  const newBlog = {
    title: 'Gentlemen Blog',
    author: 'William Forbes',
    url: 'www.gentlemenblog.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd= await helper.blogsInDb()

  const likes= blogsAtEnd.map(b => b.likes)
  expect(likes).toContain(0)
})

test('no title and no url result in bad request', async () => {
  const newBlog ={
    author: 'Sidney Sheldon',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})


//npm test -- tests/blog_api.test.js
//npm test -- -t 'Any added valid blog has a valid id'