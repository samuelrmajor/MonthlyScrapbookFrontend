import { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, handleDeleteBlog, userOwnedBool, handleUpdateBlog, loggedIn }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const loggedInLike = loggedIn ? { display: '' } : { display:'none' }
  const userOwned = userOwnedBool ? { display: '' } : { display:'none' }

  const toggleVisibility = (event) => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }
  const likeBlog = (event) => {
    event.preventDefault()
    handleUpdateBlog({ ...blog, likes: blog.likes+1 })
  }

  const sendDeleteBlog = (event) => {
    event.preventDefault()
    console.log(blog)
    handleDeleteBlog(blog)
  }

  //SHOWING DETAILS
  if (showDetails) {
    return (
      <div className = 'blog' style = {blogStyle}>
    Title: {blog.title} <br/>
    Author: {blog.author}<br/>
    <span className = "blogLikes"> Likes: {blog.likes}</span> <button id = "like-button" style = {loggedInLike} onClick={likeBlog}>Like</button><br/>
    Url: {blog.url} <br/>
        <button onClick={toggleVisibility}>Hide</button>
        <button id="remove-blog" style = {userOwned} onClick={sendDeleteBlog}>Remove</button>
      </div>
    )
  }

  else { return (
    <div className = 'blog'>
      {blog.title} {blog.author}
      <button className = "showDetails" onClick={toggleVisibility}>Show Details</button>
    </div>
  )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  userOwnedBool: PropTypes.bool.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default Blog