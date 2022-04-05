import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {initializeLogin} from '../reducers/loginReducer'
import {setNotification} from '../reducers/notificationReducer'
const LoginForm = (
) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSendLogin = (event) => {

    event.preventDefault()
    dispatch(initializeLogin({ username: username, password:password })).then( value => dispatch(setNotification({message:"Login Succeeded", type: "Login"}))).catch(value => dispatch(setNotification({message:"Wrong Credentials", type: "error"})))

    // .catch(error => {
    //   dispatch(setNotification({message:"Login Fail", type: "error"}))}).then(console.log("i hate this SHIT!!!"))
    
    setUsername('')
    setPassword('')


  }

  return (
    <div>
      <h1>LOGIN:</h1>
      <form onSubmit={handleSendLogin}>
        <div>
            Username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            id = "username-input"
          />
        </div>
        <div>
            Password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            id = "password-input"
          />
        </div>
        <button id = "login-button" type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm