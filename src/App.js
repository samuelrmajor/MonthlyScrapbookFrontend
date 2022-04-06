import { useEffect } from 'react'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LoggedInForm from './components/LoggedInForm'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import Home from './components/Home'


import { useDispatch, useSelector } from 'react-redux'

import { initializeBlogs } from './reducers/blogReducer'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

const App = () => {
  //State Declarations
    const blogs =useSelector(state=>state.blogs)
    const user = useSelector(state=>state.user)
    const notification = useSelector(state => state.notification)

  //Hooks
    //Sets blogs
    const dispatch = useDispatch()
      useEffect(() => {
      dispatch(initializeBlogs())}, [dispatch])

    const match = useMatch('/blogs/:id')
    const blog = match 
      ? blogs.find(blog => blog.id === Number(match.params.id))
      : null
      const padding = {
    padding: 5
  }

  return (
    <div>
     <Notification message = {notification.message} type = {notification.type}/>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/blogs">Blogs</Link>
        {user
          ? <span> <Link style={padding} to="/login">User Management</Link> | {user.name} </span>
          : <Link style={padding} to="/login">Login</Link> 
        }
        
      </div>
      <Routes>
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />  
        <Route path="/blogs" element={<Blogs blogs={blogs}  />} />   
        <Route path="/login" element={user ?  <LoggedInForm/> : <Togglable buttonLabel = "Login"> <LoginForm/> </Togglable>} />
        <Route path="/" element={<Home />} />      
      </Routes>   
      <div>
        <br />
        <em>Samuel Major</em>
      </div>
    </div>
  )


  // if (!user) {

  //   return (
  //     <div>
  //       <Notification
  //         message={notification.message}
  //         type = {notification.type}
  //       />
  //       <h2>Blogs</h2>
  //       <Togglable buttonLabel = "Login">
  //         <LoginForm />
  //       </Togglable>
  //       <Blogs loggedIn = {false} blogs = {blogs}/>
  //     </div>
  //   )
  // }


  // return (

  //   <div>
  //     <div>
  //       <Notification
  //         message={notification.message}
  //         type = {notification.type} />
  //     </div>
  //     <h2>Blogs</h2>
  //     <LoggedInForm/>
  //     <Togglable buttonLabel = "New Blog">
  //       <NewBlogForm user = {user}
  //       />
  //     </Togglable>
  //     <Blogs loggedIn = {true} blogs = {blogs} user = {user}/>
  //   </div>
  // )
}

export default App
