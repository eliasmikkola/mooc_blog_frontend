import React from 'react'
import BlogList from './components/blogs/BlogList'
import UserList from './components/users/UserList'
import BlogForm from './components/blogs/BlogForm'
import Blog from './components/blogs/Blog'
import LoggedInUser from './components/users/User'
import UserDetails from './components/users/UserDetails'
import Alert from './components/Alert'
import { createBrowserHistory } from 'history';


import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

class Wrapper extends React.Component {
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
      message: null,
      users: []
    }
  }

  componentWillMount() {
    blogService.getAll().then(blogs => {
      this.setState({
        blogs:blogs
      })
      
      userService.getAll().then(users => {
        this.setState({
          users
        })
      })
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        this.setState({
          user:user,
          blogs:blogs
        }, () => {
            console.log("here", Date.now());
          })
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
  userById = (id) => {
    console.log(id, this.state.users);
    if(this.state.users.length === 0){
      return userService.getUser(id).then(u => u)
    }
    else return this.state.users.find(n => n.id === id)
  }
  blogById = (id) => {
     return this.state.blogs.find(n => n.id === id)
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
        

        <Router>
          <div>
          { 
          this.state.message !== null ? <Alert alert={this.state.message}/> :'' 
        }
            { this.state.user !== null ?
            <div>
              <Link to="/">blogs</Link> &nbsp;
              <Link to="/users">users</Link>
              <LoggedInUser user={this.state.user}/>
              <button 
                key='logout' 
                onClick={this.logout}>LOGOUT
              </button>
            </div> : ''

            }
          <Route exact path="/" render={() => {
            return this.state.user === null ?
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
              <BlogForm postBlog={this.postBlog} inputStyle={this.inputStyle}/>
                <div style={{
                  marginTop: 30
                }}>
                <BlogList deleteBlog={this.deleteBlog} likeBlog={this.likeBlog} user={this.state.user} blogs={this.state.blogs} />
              </div>
            </div>
          )
          }} />
          <Route exact path="/users" render={() => <UserList users={this.state.users}/>} />
          {this.state.users.length > 0 ? 
            <Route exact path="/users/:id" render={({match}) =>
              <UserDetails user={this.userById(match.params.id)} />}
            /> : ''
          }
          {this.state.blogs.length > 0 ? 
          <Route exact path="/blogs/:id" render={({match}) => {
            const matchedBlog = this.blogById(match.params.id)
            console.log("BLOG", matchedBlog)
            return (
                matchedBlog ? <Blog blog={matchedBlog} extended={true} likeBlog={() => this.likeBlog(matchedBlog)} deleteBlog={() => this.deleteBlog(matchedBlog)}  user={this.state.user} extended={true}/> 
                : <p>No blog found</p>
              )
            }
          }
          /> : ''
        }
          
        </div>
      </Router>

    )
  }
}

const App = () => (
  <Wrapper></Wrapper>
)

export default App;
