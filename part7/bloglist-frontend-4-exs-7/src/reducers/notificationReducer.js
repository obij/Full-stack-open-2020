import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    setNotification (state, action) {
      return action.payload.notification
    }
  }
})



export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer