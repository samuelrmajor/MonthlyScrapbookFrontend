import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'
import {registerService} from '../services/registration'
const RegisterForm = (
) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }


  const  handleSendRegistration = async (event) => {
    event.preventDefault()
    if (passwordConfirm !== password) {
      setUsername('')
      setEmail('')
      dispatch(setNotification({message:"Passwords do not match", type: "error"}))
    }
    else{
    try {

    const response = await registerService({user: username, password:password, email:email})

    dispatch(setNotification({message:"Account Creation Succeeded", type: "Login"}))
    }
    
    catch {
      dispatch(setNotification({message:"Username in use", type: "error"}))

    }
  }
    



  }

  return (
    <div>
      <h1>Register:</h1>
      <form onSubmit={handleSendRegistration}>
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
        <div>
            Confirm Password:
          <input
            type="password"
            value={passwordConfirm}
            name="ConfirmPassword"
            onChange={handlePasswordConfirmChange}
            id = "confirm-password-input"
          />
        </div>
        <div>
            Email:
          <input
            type="text"
            value={email}
            name="Email"
            onChange={handleEmailChange}
            id = "email-input"
          />
        </div>
        <button id = "register-button" type="submit">Register</button>
      </form>
    </div>
  )
}

export default RegisterForm