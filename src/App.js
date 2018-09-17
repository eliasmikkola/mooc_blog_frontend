import React from 'react'
import Blog from './components/blogs/Blog'
import BlogForm from './components/blogs/BlogForm'

import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.postBlog = this.postBlog.bind(this);
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        this.setState({user})
        blogService.setToken(user.token)
      }

    } catch(e){
      console.log(e);
    }
  } 
  onFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  login = () => {
    console.log(this.state);
    const username = this.state.username
    const password = this.state.password
    
    const data = {
      username: username,
      password: password
    }
    loginService.login(data) 
      .then((result) => {
        const token = result.token
        this.setState({
          user: this.state.username
        })
        userService.getAll().then((userResult) => {
            const user = userResult.find(n => n.username === username)
            user['token'] = token
            this.setState({
              user: user ? user : null,
              username: '',
              password: ''
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
        }).catch((err) => {
          
        });
        blogService.setToken(token)
      }).catch((err) => {
        
      })
  }
  logout = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({
      user: null
    })
  }

  postBlog = (data) => {
    console.log("IN APP.js postblog", data);
    blogService.create(data).then((result) => {
      console.log(result)
      this.setState(prevState => ({
        blogs: [...prevState.blogs, result]
      }))
    }).catch((err) => {
      console.log("ERRR");
    });
  }
  

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Kirjaudu sovellukseen</h2>
          <form onSubmit={this.login}>
            <label >Username</label>
            <input
              key="username"
              name="username"
              type="text"
              onChange={this.onFieldChange}
            /><br/>
            <label>Password</label>
            <input
              key="password"
              onChange={this.onFieldChange}
              name="password"
              type="password"
            />
          </form>
          <button onClick={this.login}>Login</button>
        </div>
      )
    }
  
    return (
      <div>
        <h2>blogs</h2>
        <div key='userdiv'>
          <User user={this.state.user}/>
          <button 
            key='logout' 
            onClick={this.logout}>LOGOUT
          </button>
        </div>
        <BlogForm postBlog={this.postBlog}/>
          {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        
      </div>
    )
  }
}

export default App;
