import { useDispatch, useSelector  } from 'react-redux'
import { changeLoginForm, changeNewForm } from '../reducers/toggleableReducer'


const Togglable = props => {
  let visbility
  if (props.buttonLabel === "Login") {
    visbility = useSelector(state => state.toggleable.loginForm)
  }
  else if (props.buttonLabel === "New Blog") {
    visbility = useSelector(state => state.toggleable.newForm)
  }

  const dispatch = useDispatch()
  const toggleVisibility = () => {
    if (props.buttonLabel === "Login") {
      console.log("newLogin click")
      dispatch(changeLoginForm())}
    else if (props.buttonLabel === "New Blog"){
      console.log("newForm click")
      dispatch(changeNewForm())}
  }

  const hideWhenVisible = { display: visbility ? 'none' : '' }
  const showWhenVisible = { display: visbility ? '' : 'none' }

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