import React from 'react'
import Blog from './components/blogs/Blog'
import BlogForm from './components/blogs/BlogForm'

import User from './components/User'
import Alert from './components/Alert'

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
      user: null,
      message: null
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
            //set user and reset messages
            this.setState({
              user: user ? user : null,
              username: '',
              password: '',
              message: null
            })
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
        })
        blogService.setToken(token)
      }).catch((err) => {
        this.setState({
          message: {
            title: "Login failed",
            severity: 'danger'
          }
        })
      })
  }
  logout = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({
      user: null
    })
  }

  postBlog = (data) => {
    
    blogService.create(data).then((result) => {
      
      //set blogs
      this.setState(prevState => ({
        blogs: [...prevState.blogs, result],
        message: {
          title: `a new blog '${data.title}' by ${data.author} added`,
          severity: 'success'
        }
      }))
    }).catch((err) => {
      this.setState(prevState => ({
        message: {
          title: `failed to add blog`,
          severity: 'warning'
        }
      }))
      console.log("ERRR");
    });
  }
  
  inputStyle = {
    borderRadius: 6,
    height: 20,
    padding: 5,
    marginBottom: 10,
    marginLeft: 5

  }


  render() {
  
    return (
      
      <div>
        { 
          this.state.message !== null ? <Alert alert={this.state.message}/> :'' 
        }
        {
          this.state.user === null ?
             (  <div>

                <h2>Kirjaudu sovellukseen</h2>
                <form onSubmit={this.login}>
                  <label >Username</label>
                  <input style={this.inputStyle}
                    key="username"
                    name="username"
                    type="text"
                    onChange={this.onFieldChange}
                  /><br/>
                  <label>Password</label>
                  <input style={this.inputStyle}
                    key="password"
                    onChange={this.onFieldChange}
                    name="password"
                    type="password"
                  />
                </form>
                <button onClick={this.login}>Login</button>
                </div>
            ) :
          (<div>
            <h2>blogs</h2>
            <div key='userdiv'>
              <User user={this.state.user}/>
              <button 
                key='logout' 
                onClick={this.logout}>LOGOUT
              </button>
            </div>
            <BlogForm postBlog={this.postBlog} inputStyle={this.inputStyle}/>
              <div style={{
                  marginTop: 30
              }}>
                {this.state.blogs.map(blog =>
                  <Blog key={blog.id} blog={blog}  />
                )}
            </div>
          </div>
         )
        }
      </div>
    )
  }
}

export default App;
