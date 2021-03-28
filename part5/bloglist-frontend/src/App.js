import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Form4Blog from './components/Form4Blog'
import Togglable from './components/Togglable'
//import blogs from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [addedBlogMessage, setAddedBlogMessage]= useState(null)
  //const blogDetailsArr = []
  const postedByArr= [] 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
	  

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', userName, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 	  
	    blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog= async(blogObj) => {
    try{
      //check if all necessary fields are filled
      if(!blogObj.title || !blogObj.author || !blogObj.url){
        setErrorMessage('Error, Please input all the required fields')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        return
      }

      console.log("blogObj is ", blogObj)
      //save the blog details to  blogDetailsArr
      //blogDetailsArr.push(blogObj)
      //console.log("blogDetailsArr at addBlog is", blogDetailsArr)
      
      //Add the new blog to the database
      await blogService.create(blogObj)
      //console.log("blogObj is ", blogObj)
      const updatedBlogs= await blogService.getAll()

      //update the react state with the new blog
      setBlogs(updatedBlogs)
      
      //console.log("A new blog was added")  

      setAddedBlogMessage(`a new blog ${blogObj.title} by ${blogObj.author} added`)
      //console.log("addedBlogMessage is", addedBlogMessage)
      setTimeout(() => {
        setAddedBlogMessage(null)
      }, 5000)

    }catch(err){
      console.error(err)
    }
  }
  //console.log("blogDetailsArr after addBlog is", blogDetailsArr)
  const addLike = async(id, blogObj) => {
    try{
      //use blogServive.update to add like to blog and store in db
      await blogService.update(id, blogObj)

      const blogUpdated = {
        ...blogObj,
        id,
      }

      //next update blogs in the state
      const updatedBlogs= blogs.map((blog) => (blog.id !== id ? blog : blogUpdated))
      setBlogs(updatedBlogs)

    }catch(err){
      console.error(err)
    }
  }

  const form4Blog = () => (
    <Togglable buttonLabel = 'new note'>
      <Form4Blog addBlog= {addBlog} />
    </Togglable>
  )


  function compare_Likes(a, b){
    //a should come before b in the sorted order
    if(a.likes < b.likes){
      return -1
    //a should come after b in the sorted ofder
    }else if(a.likes > b.likes){
      return 1
    //a and b are the same  
    }else{
      return 0
    }
  }

  const deleteBlog = async(id) => {
    try{
      const blog= blogs.filter((blogObj) => blogObj.id === id)

      if(window.confirm(`Remove ${blog[0].title} by ${blog[0].author}`)){
        //remove blog from database
        await blogService.deleteBlog(id)

        //next update state
        setBlogs(blogs.filter((blogObj) => blogObj.id !== id))
      }

    }catch(err){
      console.error(err)
    }
  }

  if(user === null){
    return(
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <form onSubmit = {handleLogin}>
          <div>
            username
            <input
            type= "text"
            value= {username}
            name= "Username"
            onChange= {({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
            type= "password"
            value= {password}
            name= "Password"
            onChange= {({ target }) => setPassword (target.value)}
            />
          </div>
          <button type= "submit">login</button>
        </form>
      </div>
    )
  }

  

  return (
    <div>
      <Notification message={errorMessage} />
      <Notification message= {addedBlogMessage} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick = {handleLogout} >
        log Out
      </button>
      {form4Blog()}
      {blogs.sort(compare_Likes).map(blog =>
        <Blog key={blog.id} blog={blog}  user= {user} addLike= {addLike} deleteBlog ={deleteBlog} postedByArr ={postedByArr}/>
      )}
    </div>
  )
}

export default App


