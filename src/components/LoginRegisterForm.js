import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import { useState } from 'react'


const LoginRegisterForm = (
) => {

  const [showRegistration, setShowRegistration] = useState(false)


  const handleFormChange = (event) => {
    setShowRegistration(!showRegistration)
  }
 



  


  return (
      <div>
          <div>
            <button onClick={handleFormChange}>{showRegistration? "Login" : "Register"}</button>
        </div>
        <div>
            {showRegistration? <RegisterForm handleFormChange = {handleFormChange}/>:  <LoginForm/>}
           
            
        </div>
        
    </div>
  )
}

export default LoginRegisterForm