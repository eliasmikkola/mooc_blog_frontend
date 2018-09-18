import Promise from 'bluebird'
let token = null

const blogs = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "HTML on",
    url: "http.cat",
    likes: 15,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "demodemo",
      name: "Demottelija"
    }
  },
  {
    id: "5a451e21e0b8b04a45638211",
    title: "Selain pystyy suorittamaan vain javascriptiä",
    author: "Selain pystyy",
    url: "http.cat",
    likes: 57,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "demodemo",
      name: "Demottelija"
    }
  },
  {
    id: "5a451e30b5ffd44a58fa79ab",
    title: "HTTP-protokollan tärkeimmät metodit ovat GET ja POST",
    author: "HTTP-protokollan",
    url: "http.cat",
    likes: 12,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "demodemo",
      name: "Demottelija"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}
const setToken = (token) => {
  return token = token
}

export default { getAll, blogs, setToken }