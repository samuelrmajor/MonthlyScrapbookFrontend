import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {message: "", 
        style: "none"} ,
  reducers: {
    showNotification(state, action) {
      const message = action.payload
      return {message: message,
        style: {
            border: 'solid',
            padding: 10,
            borderWidth: 1
        }}
    },
    hideNotification(state, action) {
      return {message: "", 
        style: "none"}
    },
  }
})

export const setNotification = content => {
  return async dispatch => {
    dispatch(showNotification(content.message))
    setTimeout(() => {
            dispatch(hideNotification())
            }, content.time)
  }
}


export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer