import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
//import BlogDetails from './BlogDetails'

describe('< Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      user: 'kennyg',
      likes: '0',
      title: 'Martial Arts Blog',
      author: 'Bruce Lee',
      url: 'https://martialartsblog.com',
      id: 777987777641,
    }

    const user = 'kennyg'

    const addLike = jest.fn()
    const deleteBlog = jest.fn()

    const postedByArr = ['Martial Arts Blog']

    component = render(
      <Blog
        blog={blog}
        user={user}
        addLike={addLike}
        deleteBlog={deleteBlog}
        postedByArr={postedByArr}
      />
    )
  })

  test('renders title and author', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('Martial Arts Blog')
    expect(div).toHaveTextContent('Bruce Lee')
    expect(div).not.toHaveTextContent('0')
    expect(div).not.toHaveTextContent('https://martialartsblog.com')
  })

  test('after clicking the button, blog url and number of likes shown', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('0')
    expect(div).toHaveTextContent('https://martialartsblog.com')
  })
})
