import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createBlog} from '../reducers/blogReducer'
const NewBlogForm = (user) => {
  const [newAuthorName, setNewAuthorName] = useState('')
  const [newBlogName, setNewBlogName] = useState('')
  const [newURL, setNewURL] = useState('')

  const dispatch = useDispatch()
  const addNewBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogName,
      author: newAuthorName,
      url: newURL
    }
    
    dispatch(createBlog({newBlog: blogObject, user: user}))
    setNewBlogName('')
    setNewAuthorName('')
    setNewURL('')
  }

  const handleBlogChange = (event) => {
    setNewBlogName(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthorName(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }




  return (
    <div>
      <h1>New Blog:</h1>
      <form onSubmit={addNewBlog}>
        <div>
            Title:
          <input
            type="text"
            value={newBlogName}
            name="title"
            onChange={handleBlogChange}
            id='new-blog-title-input'
          />
        </div>
        <div>
            Author:
          <input
            type="text"
            value={newAuthorName}
            name="author"
            onChange={handleAuthorChange}
            id='new-blog-author-input'
          />
        </div>
        <div>
            URL:
          <input
            type="text"
            value={newURL}
            name="url"
            onChange={handleURLChange }
            id='new-blog-url-input'
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )}

export default NewBlogForm