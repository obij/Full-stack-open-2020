import React from 'react'
//import userService from '../services/users'
import { Link } from 'react-router-dom'


const Users = ({ users }) => {
  /*const [users, setUsers]= useState([])

  useEffect(() => {
    userService.getAll()
      .then((users) => setUsers(users))
  }, [])*/

  return(
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}> {user.name}</Link>  | Blogs created: {user.blogs.length}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users