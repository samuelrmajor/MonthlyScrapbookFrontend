import { useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LoggedInForm from './components/LoggedInForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  //State Declarations
  // const [notifMessage, setNotifMessage] = useState(null)
  // const [notifMessageType, setNotifMessageType] = useState('')

  //Hooks

    const dispatch = useDispatch()
      useEffect(() => {
      dispatch(initializeBlogs())}, [dispatch])

    const blogs =useSelector(state=>state.blogs)
    const user = useSelector(state=>state.user)
    const notification = useSelector(state => state.notification)
  if (!user) {

    return (
      <div>
        <Notification
          message={notification.message}
          type = {notification.type}
        />
        <h2>Blogs</h2>
        <Togglable buttonLabel = "Login">
          <LoginForm />
        </Togglable>
        <div>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} userOwnedBool = {false} loggedIn = {false}/>
          )}
        </div>
      </div>
    )
  }


  return (

    <div>
      <div>
        <Notification
          message={notification.message}
          type = {notification.type} />
      </div>
      <h2>Blogs</h2>
      <LoggedInForm/>
      <Togglable buttonLabel = "New Blog">
        <NewBlogForm user = {user}
        />
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id}
            blog={blog}
            userOwnedBool = {user.id === blog.user}
            loggedIn = {true} />
        )}
      </div>
    </div>
  )
}

export default App
