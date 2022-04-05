import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'




const toggleSlice = createSlice({
  name: 'toggleables',
  initialState: {loginForm: true, newForm: false},
  reducers: {
    changeLoginFormState(state, action) {
      return {...state, loginForm: !state.loginForm}
    },
    changeNewFormState(state,action) {
      return {...state, newForm: !state.newForm}
    }
  }
})

export const changeLoginForm = () => {
  return async dispatch => {
    dispatch(changeLoginFormState())
  }
}

export const changeNewForm = () => {
  return async dispatch => {
    dispatch(changeNewFormState())
  }
}








export const {changeLoginFormState, changeNewFormState} = toggleSlice.actions
export default toggleSlice.reducer