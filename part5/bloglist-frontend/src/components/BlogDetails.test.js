import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogDetails from './BlogDetails'

test('clicking the like button twicc calls event handler twice', () => {
  const blog = {
    user: 'kennyg',
    likes: '0',
    title: 'Martial Arts Blog',
    author: 'Bruce Lee',
    url: 'https://martialartsblog.com',
    id: 777987777641,
  }

  const user = 'kennyg'

  const mockhandler = jest.fn()
  const removeBlog = jest.fn()
  const postedByArr = ['Martial Arts Blog']

  const component = render(
    <BlogDetails
      blog={blog}
      user={user}
      updateLike={mockhandler}
      removeBlog={removeBlog}
      postedByArr={postedByArr}
    />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockhandler.mock.calls).toHaveLength(2)
})
