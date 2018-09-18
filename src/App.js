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
    this.likeBlog = this.likeBlog.bind(this);
    this.deleteBlog = this.deleteBlog.bind(this);
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      message: null
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs => {
      console.log("BLOGS");
      
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        console.log("INSIDE")
        const user = JSON.parse(loggedUserJSON)
        this.setState({
          user:user,
          blogs:blogs})
        blogService.setToken(user.token)
      }
      
    }).catch (e => {

    })
  } 
  onFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  login = () => {
    const username = this.state.username
    const password = this.state.password
    
    const data = {
      username: username,
      password: password
    }
    loginService.login(data) 
      .then((result) => {
        console.log(result);
        const token = result.token
        this.setState({
          user: result
        })
        window.localStorage.setItem('loggedUser', JSON.stringify(result))
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


  likeBlog = (data) => {
    console.log("LIKE", data);
    const updatedBlog = {
        likes: data.likes + 1,
        title: data.title,
        author: data.author,
        url: data.url,
        user: data.user['_id']
    }

    blogService.update(data.id, updatedBlog).then((result) => {
      //set blogs
      this.setState(prevState => ({
        blogs: prevState.blogs.map(n => n.id === result.id ? result : n),
        message: {
          title: `'${data.title}' liked`,
          severity: 'success'
        }
      }))
    }).catch((err) => {
      console.log("errr", err);
    })
  }
  deleteBlog = (data) => {
    if (window.confirm(`Delete ${data.title}?`)){
      blogService.remove(data.id).then((result) => {
        this.setState(prevState => ({
          blogs: prevState.blogs.filter(n => n.id !== data.id),
          message: {
            title: `'${data.title}' deleted`,
            severity: 'success'
          }
        }))
      }).catch((err) => {
        console.log("errr", err);
      })
    }
  }

  

  
  inputStyle = {
    borderRadius: 6,
    height: 20,
    padding: 5,
    marginBottom: 10,
    marginLeft: 5

  }


  render() {
    console.log("IN RENDER", this.state);
    return (
      
      <div>
        { 
          this.state.message !== null ? <Alert alert={this.state.message}/> :'' 
        }
        {
          this.state.user === null ?
             (  <div>

                <h2>Kirjaudu sovellukseen</h2>
                <form className="loginForm" onSubmit={this.login}>
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
                {
                  this.state.blogs.sort((a,b) => b.likes - a.likes).map(blog =>
                    <Blog likeBlog={() => this.likeBlog(blog)} deleteBlog={() => this.deleteBlog(blog)} key={blog.id} blog={blog} user={this.state.user}/>
                  )
                }
            </div>
          </div>
         )
        }
      </div>
    )
  }
}

export default App;
