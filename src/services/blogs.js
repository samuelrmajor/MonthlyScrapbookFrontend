import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}



const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const { id, ...myObject } = newObject
  const response = await axios.put(`${baseUrl}/${id}`, myObject,config)
  return response.data
}

const deleteBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const id = blogObject.id
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, setToken, deleteBlog }