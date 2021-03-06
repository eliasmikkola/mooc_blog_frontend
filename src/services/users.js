import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const getUser = (id) => {
  const request = axios.get(`${baseUrl}/${id}/`)
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

export default { getAll, create, setToken , getUser}