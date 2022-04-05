import { useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
const Blog = ({ blog, userOwnedBool, loggedIn }) => {
  //do i need to outsource user owned? probably in blogs component
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const dispatch = useDispatch()

  const loggedInLike = loggedIn ? { display: '' } : { display:'none' }
  const userOwned = userOwnedBool ? { display: '' } : { display:'none' }

  const toggleVisibility = (event) => {
    event.preventDefault()
    setShowDetails(!showDetails)
  }
  const likeCurrentBlog = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const sendDeleteBlog = (event) => {
    event.preventDefault()
    dispatch(deleteBlog(blog))
  }

  //SHOWING DETAILS
  if (showDetails) {
    return (
      <div className = 'blog' style = {blogStyle}>
    Title: {blog.title} <br/>
    Author: {blog.author}<br/>
    <span className = "blogLikes"> Likes: {blog.likes}</span> <button id = "like-button" style = {loggedInLike} onClick={likeCurrentBlog}>Like</button><br/>
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
  userOwnedBool: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default Blog