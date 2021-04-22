import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Form4Blog from './Form4Blog'

test('<Form4Blog/> accepts inputs and calls onSubmit', () => {
  const addBlog = jest.fn()

  const component = render(<Form4Blog addBlog={addBlog} />)

  //const inputTitle = component.container.querySelector('.inputTitle')
  //const inputTitle = component.getByLabelText('title')
  const inputAuthor = component.getByLabelText('author')
  const inputUrl = component.getByLabelText('url')
  //const inputAuthor= component.container.querySelector('.inputAuthor')
  //const inputUrl= component.container.querySelector('.inputUrl')
  const form = component.container.querySelector('form')

  //fireEvent.change(inputTitle, {
  //  target: { value: 'Martial Arts Blog' },
  //})

  fireEvent.change(inputAuthor, {
    target: { value: 'Bruce Lee' },
  })

  fireEvent.change(inputUrl, {
    target: { value: 'https://martialartsblog.com' },
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  //expect(addBlog.mock.calls[0][0].title).toBe('Martial Arts Blog')
  expect(addBlog.mock.calls[0][0].author).toBe('Bruce Lee')
  expect(addBlog.mock.calls[0][0].url).toBe('https://martialartsblog.com')
})
