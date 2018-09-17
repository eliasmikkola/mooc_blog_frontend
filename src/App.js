import React from 'react'
import Blog from './components/Blog'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

class App extends React.Component {
  constructor(props) {
    super(props)
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
  } 
  onFieldChange = (event) => {
    console.log(event.target.value)
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
        this.setState({
          user: this.state.username
        })
        userService.getAll() .then((userResult) => {
            const user = userResult.find(n => n.username === username)
            this.setState({
              user: user ? user : null
            })
        }).catch((err) => {
          
        });
        blogService.setToken(result.token)
      }).catch((err) => {
        
      })
  }
  

  render() {
    if (this.state.user === null) {
      return (
        <div>
          <h2>Kirjaudu sovellukseen</h2>
          <form>
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
          <button onClick={this.login}></button>
        </div>
      )
    }
  
    return (
      <div>
        <h2>blogs</h2>
        <User user={this.state.user}/>
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App;
