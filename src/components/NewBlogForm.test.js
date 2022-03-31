import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('<NewBlogForm /> updates parent state and calls onSubmit', () => {
  const newBlog = jest.fn()

  const content = render(<NewBlogForm handleNewBlog={newBlog} />).container

  const inputAuthor = content.querySelector('#new-blog-author-input')
  const inputUrl = content.querySelector('#new-blog-url-input')
  const inputTitle = content.querySelector('#new-blog-title-input')
  const sendButton = screen.getByText('Create')

  userEvent.type(inputAuthor, 'testAuthor' )
  userEvent.type(inputUrl, 'testUrl' )
  userEvent.type(inputTitle, 'testTitle' )
  userEvent.click(sendButton)

  expect(newBlog.mock.calls).toHaveLength(1)
  console.log(newBlog.mock.calls[0][0])
  expect(newBlog.mock.calls[0][0].author).toBe('testAuthor')
  expect(newBlog.mock.calls[0][0].url).toBe('testUrl')
  expect(newBlog.mock.calls[0][0].title).toBe('testTitle')
})


//new-blog-author-input'