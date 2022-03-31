import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LoggedInForm from './components/LoggedInForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  //State Declarations
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifMessageType, setNotifMessageType] = useState('')

  //Hooks
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes -a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  //Services/Funcs
  //Logs User in and Saves token locally


  const handleLogin = async ({ username,password }) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      generateNotification({ message: 'Login Successful', type: 'Succesful Login' })
    } catch (exception) {
      generateNotification({ message: 'Wrong Credentials', type: 'error' })
    }
  }

  //Logs user out, deletes token
  const handleLogout = (event = 0 ) => {
    if (event) {
      event.preventDefault()
    }
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setNotifMessageType('LoggedOutSuccessfully')
    setNotifMessage('Logged Out Successfully')
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000)

  }
  //Generate notification
  const generateNotification = ({ message, type }) => {
    setNotifMessageType(type)
    setNotifMessage(message)
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000)

  }
  //creates new blog
  const handleNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const response = await blogService.create(blogObject)
      setBlogs(blogs.concat({ ...response,user:user.id }))
      generateNotification({ message: 'Blog Creation Succeeded', type: 'BlogCreationSucceeded' })
    } catch (error) {
      generateNotification({ message: 'Blog Creation Failed', type: 'error' })
    }
  }
  const blogFormRef = useRef()


  //Deletes Blog
  const handleDeleteBlog = async (blogObject) => {
    if (window.confirm('Delete: ' + blogObject.title + '?' )) {
      try {
        await blogService.deleteBlog(blogObject)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        generateNotification({ message: 'Blog Deletion Succeeded', type: 'BlogDeletionSucceeded' })
      } catch (error) {
        if (error.response.data.error === 'expiredtoken') {
          generateNotification({ message: 'Session Expired', type: 'error' })
          handleLogout()
        }
      }}
  }

  //Updates a Blog
  const handleUpdateBlog = async (blogObject) => {
    try {
      const response = await blogService.update(blogObject)
      setBlogs(blogs.filter(blog => blog.id !== response.id).concat(response).sort((a,b) => b.likes-a.likes))
    } catch (error) {
      if (error.response.data.error === 'expiredtoken') {
        generateNotification({ message: 'Session Expired', type: 'error' })
        handleLogout()}
      else
      {generateNotification({ message: 'Blog Like Failed', type: 'error' })}

    }}






  if (user===null) {
    return (
      <div>
        <Notification
          message={notifMessage}
          type = {notifMessageType}
        />
        <h2>Blogs</h2>
        <Togglable buttonLabel = "Login">
          <LoginForm
            handleLogin={handleLogin}
          />
        </Togglable>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleDeleteBlog = {handleDeleteBlog} userOwnedBool = {false} handleUpdateBlog = {handleUpdateBlog} loggedIn = {false}/>
          )}
        </div>
      </div>
    )
  }


  return (

    <div>
      <div>
        <Notification
          message={notifMessage}
          type = {notifMessageType} />
      </div>
      <h2>Blogs</h2>
      <LoggedInForm
        user = {user}
        handleLogout = {handleLogout}
      />
      <Togglable buttonLabel = "New Blog" ref = {blogFormRef}>
        <NewBlogForm
          handleNewBlog = {handleNewBlog}
        />
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            handleDeleteBlog = {handleDeleteBlog}
            userOwnedBool = {user.id === blog.user}
            handleUpdateBlog = {handleUpdateBlog}
            loggedIn = {true} />
        )}
      </div>
    </div>
  )
}

export default App
