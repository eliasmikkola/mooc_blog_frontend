import axios from 'axios'
const baseUrl = '/api/login'

let token = null

const login = (data) => {
  const request = axios.post(baseUrl, data)
  return request.then(response => response.data)
}

export default { login }