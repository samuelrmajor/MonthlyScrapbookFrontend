import { configureStore } from '@reduxjs/toolkit'
import toggleableReducer from './reducers/toggleableReducer'
import loginReducer from './reducers/loginReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: loginReducer,
    toggleable: toggleableReducer
  }
})




export default store