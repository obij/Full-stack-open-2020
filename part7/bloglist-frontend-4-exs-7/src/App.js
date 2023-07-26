/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react'
import { Routes, Route, Link,  useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import Form4Blog from './components/Form4Blog'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeABlog, delBlog } from './reducers/blogReducer'
import { setTheUser, resetUser } from './reducers/loginReducer'
import Users from './components/Users'
import userService from './services/users'


//create Blogs component
const Blogs= ({ addBlog, blogsState, compare_Likes }) => {
  const form4Blog = () => (
    <Togglable buttonLabel="new blog">
      <Form4Blog addBlog={addBlog} />
    </Togglable>
  )
  return(
    <div>
      {form4Blog()}
      <h2>blogs</h2>
      <ul>
        {blogsState.slice().sort(compare_Likes('likes', 'desc')).map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
  /*return(
    <div>
      {form4Blog()}
      <h2>blogs</h2>
      {blogsState.slice().sort(compare_Likes('likes', 'desc')).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          addLike={addLike}
          deleteBlog={deleteBlog}
          postedByArr={postedByArr}
        />
      ))}
    </div>
  )*/
}

//create User component
const User= () => {
  /*if(!blogUser){
    return null
  }*/
  /*const [user, setUser]= useState(null)



  useEffect(() => {
    if (blogUser) {
      // Fetch the individual user details using their id
      userService.getUserById(blogUser.id)
        .then((userDetails) => {
          // Do something with the userDetails (if needed)
          console.log(userDetails)
          setUser[userDetails]
        })
        .catch((error) => {
          // Handle any errors (if needed)
          console.error('Error fetching user details:', error)
        })
    }
  }, [blogUser])

  if (!blogUser) {
    return <div>Loading user data...</div>
  }*/
  const [user, setUser]= useState(null)
  const userId = useParams().id
  console.log(userId)
  //const user= users.find(u => u.id === Number(id))

  useEffect(() => {
    if (userId) {
      // Fetch the individual user details using their id
      userService.getUserById(userId)
        .then((userDetails) => {
          // Do something with the userDetails (if needed)
          console.log(userDetails)
          setUser(userDetails)
        })
        .catch((error) => {
          // Handle any errors (if needed)
          console.error('Error fetching user details:', error)
        })
    }
  }, [userId])

  if(!user){
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key= {blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}



const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [errorMessage, setErrorMessage] = useState(null)
  //const [user, setUser] = useState(null)
  //const [addedBlogMessage, setAddedBlogMessage] = useState(null)
  //const blogDetailsArr = []
  const postedByArr = []
  const [users, setUsers]= useState([])

  useEffect(() => {
    userService.getAll()
      .then((users) => setUsers(users))
  }, [])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  /*useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])*/

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      dispatch(setTheUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const notification = useSelector(( state ) => {
    return state.notifications
  })

  const blogsState = useSelector(( state ) => {
    return state.blogs
  })

  const user= useSelector((state) => {
    return state.logins
  })





  //Refactoring handleLogin
  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', userName, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      // eslint-disable-next-line no-mixed-spaces-and-tabs
      blogService.setToken(user.token)
      //setUser(user)
      dispatch(setTheUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      //setErrorMessage('Wrong username or password')
      dispatch(setNotification({ notification: 'Wrong username or password' }))
      setTimeout(() => {
        //setErrorMessage(null)
        dispatch(setNotification({ notification: null }))
      }, 5000)
    }
  }

  /*
  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', userName, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      // eslint-disable-next-line no-mixed-spaces-and-tabs
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
  } */


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    //setUser(null)
    dispatch(resetUser({ user: null }))
  }

  //Refactoring addBlog
  const addBlog = async (blogObj) => {
    try {
      //check if all necessary fields are filled
      if (!blogObj.title || !blogObj.author || !blogObj.url) {
        //setErrorMessage('Error, Please input all the required fields')
        dispatch(setNotification({ notification: 'Error, Please input all the required fields' }))
        setTimeout(() => {
          //setErrorMessage(null)
          dispatch(setNotification({ notification: null }))
        }, 5000)
        return
      }

      console.log('blogObj is ', blogObj)
      //save the blog details to  blogDetailsArr
      //blogDetailsArr.push(blogObj)
      //console.log("blogDetailsArr at addBlog is", blogDetailsArr)

      //Add the new blog to the database
      //await blogService.create(blogObj)
      //console.log("blogObj is ", blogObj)
      //const updatedBlogs = await blogService.getAll()

      //update the react state with the new blog
      //setBlogs(updatedBlogs)
      dispatch(createBlog(blogObj))

      //console.log("A new blog was added")

      //setAddedBlogMessage(
      //  `a new blog ${blogObj.title} by ${blogObj.author} added`
      //)
      dispatch(setNotification({ notification: `a new blog ${blogObj.title} by ${blogObj.author} added` }))
      //console.log("addedBlogMessage is", addedBlogMessage)
      setTimeout(() => {
        //setAddedBlogMessage(null)
        dispatch(setNotification({ notification: null }))
      }, 5000)
    } catch (err) {
      console.error(err)
    }
  }

  /*const addBlog = async (blogObj) => {
    try {
      //check if all necessary fields are filled
      if (!blogObj.title || !blogObj.author || !blogObj.url) {
        setErrorMessage('Error, Please input all the required fields')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        return
      }

      console.log('blogObj is ', blogObj)
      //save the blog details to  blogDetailsArr
      //blogDetailsArr.push(blogObj)
      //console.log("blogDetailsArr at addBlog is", blogDetailsArr)

      //Add the new blog to the database
      await blogService.create(blogObj)
      //console.log("blogObj is ", blogObj)
      const updatedBlogs = await blogService.getAll()

      //update the react state with the new blog
      setBlogs(updatedBlogs)

      //console.log("A new blog was added")

      setAddedBlogMessage(
        `a new blog ${blogObj.title} by ${blogObj.author} added`
      )
      //console.log("addedBlogMessage is", addedBlogMessage)
      setTimeout(() => {
        setAddedBlogMessage(null)
      }, 5000)
    } catch (err) {
      console.error(err)
    }
  }*/
  //console.log("blogDetailsArr after addBlog is", blogDetailsArr)

  //Refactoring addLike
  const addLike = async (id, blogObj) => {
    try {
      //use blogServive.update to add like to blog and store in db
      /*await blogService.update(id, blogObj)

      const blogUpdated = {
        ...blogObj,
        id,
      }

      //next update blogs in the state
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : blogUpdated
      )
      setBlogs(updatedBlogs)*/
      await dispatch(likeABlog(id, blogObj))
    } catch (err) {
      console.error(err)
    }
  }
  /*
  const addLike = async (id, blogObj) => {
    try {
      //use blogServive.update to add like to blog and store in db
      await blogService.update(id, blogObj)

      const blogUpdated = {
        ...blogObj,
        id,
      }

      //next update blogs in the state
      const updatedBlogs = blogs.map((blog) =>
        blog.id !== id ? blog : blogUpdated
      )
      setBlogs(updatedBlogs)
    } catch (err) {
      console.error(err)
    }
  }*/

  /*const form4Blog = () => (
    <Togglable buttonLabel="new blog">
      <Form4Blog addBlog={addBlog} />
    </Togglable>
  )*/



  function compare_Likes(property,order) {
    var sort_order = 1
    if(order === 'desc'){
      sort_order = -1
    }
    return function (a, b){
      // a should come before b in the sorted order
      if(a[property] < b[property]){
        return -1 * sort_order
        // a should come after b in the sorted order
      }else if(a[property] > b[property]){
        return 1 * sort_order
        // a and b are the same
      }else{
        return 0 * sort_order
      }
    }
  }

  //Refactoring deleteBlog
  const deleteBlog = async (id) => {
    try {
      //const blog = blogs.filter((blogObj) => blogObj.id === id)
      const blog = blogsState.filter((blogObj) => blogObj.id === id)

      if (window.confirm(`Remove ${blog[0].title} by ${blog[0].author}`)) {
        //remove blog from database
        /*await blogService.deleteBlog(id)

        //next update state
        setBlogs(blogs.filter((blogObj) => blogObj.id !== id))*/
        await dispatch(delBlog(id))
      }
    } catch (err) {
      console.error(err)
    }
  }

  /*const deleteBlog = async (id) => {
    try {
      const blog = blogs.filter((blogObj) => blogObj.id === id)

      if (window.confirm(`Remove ${blog[0].title} by ${blog[0].author}`)) {
        //remove blog from database
        await blogService.deleteBlog(id)

        //next update state
        setBlogs(blogs.filter((blogObj) => blogObj.id !== id))
      }
    } catch (err) {
      console.error(err)
    }
  }*/

  const padding= {
    padding: 5
  }

  /*const match = useMatch('/users/:id')

  const blogUser= match
    ? users.find(user => user.id === Number(match.params.id))
    : null*/

  /*const match= useMatch('/blogs/:id')
  console.log(match)
  const blog= match
    ? blogsState.find(blog => blog.id === Number(match.params.id))
    : null

  console.log(blog)*/

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              id= "username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id= "login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>blog app</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>log Out</button>
      <div>
        <Link style={padding} to= '/blogs'>blogs</Link>
        <Link style={padding} to= '/users'>users</Link>
      </div>
      <Routes>
        <Route path='/blogs/:id' element= {<Blog addLike={addLike} deleteBlog={deleteBlog} user={user} postedByArr={postedByArr} />} />
        <Route path='/users/:id' element= {<User/>} />
        <Route path='/blogs' element= {<Blogs  blogsState={blogsState} compare_Likes={compare_Likes} addBlog={addBlog} />} />
        <Route path='/users' element= {<Users users= {users} />} />
      </Routes>
    </div>
  )

  /*return (
    <div>
      <Notification message={notification} />
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>log Out</button>
      {form4Blog()}
      {blogsState.slice().sort(compare_Likes('likes', 'desc')).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          addLike={addLike}
          deleteBlog={deleteBlog}
          postedByArr={postedByArr}
        />
      ))}
    </div>
  )*/
}

export default App

