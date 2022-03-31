import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
  let defaultVis
  if (props.buttonLabel === "Login") {
    defaultVis = true
  }
  else {
    defaultVis = false
  }
  
  const [visible, setVisible] = useState(defaultVis)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

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
})

Togglable.displayName = 'Togglable'
export default Togglable