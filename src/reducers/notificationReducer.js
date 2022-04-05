import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {message: null, 
        type: "error"} ,
  reducers: {
    showNotification(state, action) {
      const message = action.payload.message
      const type = action.payload.type
      return {message: message, type: type}
    },
    hideNotification(state, action) {
      return {message: null, 
        style: "none"}
    },
  }
})

export const setNotification = content => {
  return async dispatch => {
    dispatch(showNotification({message: content.message, type: content.type}))
    setTimeout(() => {
            dispatch(hideNotification())
            }, 5000)
  }
}


export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer