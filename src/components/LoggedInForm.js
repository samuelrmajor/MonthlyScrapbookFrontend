import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {endLogin} from '../reducers/loginReducer'
const LoggedInForm = () => { 
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleLogin = () => {
    dispatch(endLogin())
  }
  return(
  <div>
    <h5>logged in as: {user.name}</h5>
    <form onSubmit={handleLogin}>
      <button type="submit">Log Out</button>
    </form>
  </div>
)}

export default LoggedInForm