import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObj) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObj)
  return response.data
}

const deleteBlog = async (id) => {
  const token4Delete = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, token4Delete)
  return response.data
}

const getBlogById = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`)
  return response.data
}

const addComment = async (blogId, commentObj) => {
  const response = await axios.put(`${baseUrl}/${blogId}/comments`, commentObj)
  return response.data
}

export default { getAll, create, setToken, update, deleteBlog, getBlogById, addComment }