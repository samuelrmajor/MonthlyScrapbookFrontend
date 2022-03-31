import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'



describe('<Blog />', () => {
  let container
  let handleDeleteBlog
  let handleUpdateBlog
  beforeEach(() => {
    handleDeleteBlog = jest.fn()
    handleUpdateBlog = jest.fn()
    const blog = {
      title: 'testtitle',
      author: 'testauthor',
      url: 'testurl',
      likes: 1223
    }

    container = render(<Blog blog={blog} handleDeleteBlog = {handleDeleteBlog} handleUpdateBlog = {handleUpdateBlog} userOwnedBool = {true} loggedIn ={true}/>).container
  })


  test('renders basic blog content', () => {
    const elementurl = screen.queryByText('testurl')
    const elementlikes = screen.queryByText('1223')
    const elementtitle = screen.getByText(
      'testtitle', { exact: false }
    )
    const elementauthor = screen.getByText(
      'testauthor', { exact: false }
    )

    expect(elementtitle).toBeDefined()
    expect(elementauthor).toBeDefined()
    expect(elementlikes).toBeNull()
    expect(elementurl).toBeNull()
  })


  test('renders more content after show details button is pressed', () => {
    const button = screen.getByText('Show Details')
    userEvent.click(button)
    expect(button).toBeDefined()
    const elementlikes = screen.getByText(
      '1223', { exact: false }
    )
    const elementurl = screen.getByText(
      'testurl', { exact: false }
    )

    expect(elementlikes).toBeDefined()
    expect(elementurl).toBeDefined()


  })

  test('the like button is clicked twice and is registered twice', () => {
    const showDetailsButton = screen.getByText('Show Details')
    userEvent.click(showDetailsButton)
    const likeButton = screen.getByText('Like')
    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(handleUpdateBlog.mock.calls).toHaveLength(2)



  })

})
