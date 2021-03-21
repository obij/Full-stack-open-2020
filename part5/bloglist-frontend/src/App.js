import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Form4Blog from './components/Form4Blog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [addedBlogMessage, setAddedBlogMessage]= useState(null)

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
      <Form4Blog addBlog= {addBlog}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App