import { createSlice } from '@reduxjs/toolkit'

import blogService from './services/blogs'

//??/toDo
//import NewAnecdote from '../components/NewAnecdote'
//Add a form state
//{ ...response,user:user.id } check on this added below sitll no user though
///Handle logout on expired token handleLogout() : if (error.response.data.error === 'expiredtoken') (DELETE AND UPDATE AND POST)
//
const blogSlice = createSlice({
  name: 'blogs',
  initialState:[],
  reducers: {
    updateBlog(state, action) {
      const changedBlog = action.payload
      const id = changedAnecdote.id
      return sortBlogs(state.map(blog => blog.id !== id ? blog : changedBlog))
    },
    appendBlog(state,action) {
      state.push(action.payload)
    },
    setBlogs(state,action) {
      return action.payload
    },
    removeBlog(state,action){
      const removedBlog = action.payload
      return state.filter(blog => blog.id !== removedBlog.id)

    }
  }
})


const sortBlogs = ({blogs}) =>{
  const returnBlogs = blogs.sort((a,b) => b.likes -a.likes)
  return returnBlogs
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(sortBlogs(blogs)))
  }
}


export const createBlog= content => {
  //can this be done
  const user = useSelector(state => state.user)
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog({...newBlog, user:user.id  }))
  }
}

export const likeBlog = content => {
  console.log("like", content)
  const object = {...content, likes: content.likes + 1}
  return async dispatch => {
    const likedBlog = await blogService.update(object)
    dispatch(updateBlog(likedBlog))
  }
}

export const deleteBlog = content => {
  console.log("delete", content)
  return async dispatch => {
    await blogService.deleteBlog(content)
    dispatch(removeBlog(content))
  }
}



export const {removeBlog, updateBlog, appendBlog,setBlog } = blogSlice.actions
export default blogSlice.reducer