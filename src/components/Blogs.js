import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import {setNotification} from '../reducers/notificationReducer'
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
    dispatch(deleteBlog(blog)).then( value => dispatch(setNotification({message:"Blog Deletion Succeeded", type: "BlogDeletion"}))).catch(value => dispatch(setNotification({message:"Blog Deletion Failed", type: "error"})))
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



const Blogs = ({ blogs, user }) => {

  if (user){
  return (
    <div>
        {blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            userOwnedBool = {user.id === blog.user}
            loggedIn = {true} />
        )}
    </div>
  )}
  
  return (
      <div>
            {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} userOwnedBool = {false} loggedIn = {false}/>
        )}
      </div>

  )


}



export default Blogs