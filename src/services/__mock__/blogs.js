let token = null

const notes = [
  {
    id: "5a451df7571c224a31b5c8ce",
    title: "HTML on helppoa",
    author: "HTML on",
    url: "http.cat",
    likes: 15,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
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
      username: "mluukkai",
      name: "Matti Luukkainen"
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
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(notes)
}

export default { getAll, notes }