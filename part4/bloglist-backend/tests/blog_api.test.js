const mongoose = require('mongoose')
const helper= require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog= require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
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

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    //console.log('blogToDelete is ', blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update a blog', () => {
  test('verifies successful update of blog', async () => {
    const updatedLikes= {
      likes: 60
    }

    const blogsAtStart= await helper.blogsInDb()
    const blogToUpdate= blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200)

    const blogsAtEnd= await helper.blogsInDb()
    const likes= blogsAtEnd.map(b => b.likes)
    expect(likes).toContain(60)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('invalid users not created and suitable status code and error message returned', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser= {
      userName: 'ml',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd= await helper.usersInDb()
    expect (usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames= usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.userName)

  })

})

afterAll(() => {
  mongoose.connection.close()
})


//npm test -- tests/blog_api.test.js
//npm test -- -t 'Any added valid blog has a valid id'