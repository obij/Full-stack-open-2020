import { configureStore } from '@reduxjs/toolkit'
import notificationReducer  from './reducers/notificationReducer'
import blogReducer  from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'


const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    logins: loginReducer
  }
})

export default store