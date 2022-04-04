import { useDispatch, useSelector  } from 'react-redux'
import { changeLoginForm, changeNewForm } from '../reducers/toggleableReducer'


const Togglable = props => {
  let visbility
  if (props.buttonLabel === "Login") {
    visbility = useSelector(state => state.toggleables.loginForm)
  }
  else if (props.buttonLabel === "New Blog") {
    visbility = useSelector(state => state.toggleables.newForm)
  }

  const dispatch = useDispatch()
  const toggleVisibility = () => {
    if (props.buttonLabel === "Login") 
      dispatch(changeLoginForm())
    else if (props.buttonLabel === "New Blog")
      dispatch(changeNewForm())
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable