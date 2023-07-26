import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'logins',
  initialState: null,
  reducers: {
    setTheUser(state, action){
      return action.payload
    },
    resetUser(state, action){
      return action.payload.user
    }
  }
})

export const { setTheUser, resetUser }= loginSlice.actions

export default loginSlice.reducer