import axios from 'axios'
const baseUrl = '/api/users'


const getAll= () => {
  const request= axios.get(baseUrl)
  return request.then((response) => response.data)
}

const getUserById = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`)
  return response.data
}

//export default { getAll }
export default { getAll, getUserById }