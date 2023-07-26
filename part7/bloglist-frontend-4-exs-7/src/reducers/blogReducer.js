import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action){
      return action.payload
    },
    appendBlog(state, action){
      state.push(action.payload)

    },
    likeBlog(state, action){
      const id= action.payload.id
      const likedBlog= action.payload
      const blogIndex = state.findIndex((blog) => blog.id === id)
      if(blogIndex !== -1){
        state[blogIndex] = likedBlog
      }
    },
    deleteBlog(state, action){
      const delBlogId= action.payload.id
      return state.filter((blog) => blog.id !== delBlogId)
    }
  }
})

export const { setBlogs, appendBlog, likeBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs= await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}


export const likeABlog = (id, likedBlog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, likedBlog)
    dispatch(likeBlog(updatedBlog))
  }
}

export const delBlog = (id) => {
  return async dispatch => {
    //const deletedBlog = await blogService.deleteBlog(id)
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer