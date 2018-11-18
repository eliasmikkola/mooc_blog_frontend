import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  console.log("HERE??");
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const createComment = async (id, newObject) => {
  
  const response = await axios.post(`${baseUrl}/${id}/comments/`, newObject)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, update,remove, setToken, createComment }