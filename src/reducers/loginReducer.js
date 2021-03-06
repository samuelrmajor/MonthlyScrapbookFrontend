import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch, useSelector  } from 'react-redux'
import setNotification from './notificationReducer'

//??/toDo
//import NewAnecdote from '../components/NewAnecdote'
//Add a form state
//{ ...response,user:user.id } check on this added below sitll no user though
///Handle logout on expired token handleLogout() : if (error.response.data.error === 'expiredtoken') (DELETE AND UPDATE AND POST)
//


//check on what user currently stores.
//    
  let loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  let userInit
  if (loggedUserJSON) {
    userInit = JSON.parse(loggedUserJSON)
    blogService.setToken(userInit.token)
  }
  else{
    userInit = null
  }


const userSlice = createSlice({
  name: 'user',
  initialState:userInit,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logoutUser(state,action) {
      return null
    }
  }
})

export const initializeLogin = content => {
  const username = content.username
  const password = content.password
  return async dispatch => {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      //Set notification here??
    dispatch(setUser(user))
     
  }
}


export const endLogin= content => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser())
  }
}






export const {logoutUser, setUser} = userSlice.actions
export default userSlice.reducer