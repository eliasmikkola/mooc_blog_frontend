import React from 'react'
import PropTypes from 'prop-types'
import {Link } from 'react-router-dom'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ""
    }
  }
  
 
  
  likeBlog = (e) => {
    e.stopPropagation();
    console.log("like blog");
    this.props.likeBlog()
  }
  postComment = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const comments = this.props.blog.comments ? this.props.blog.comments : []
    this.props.postComment({...this.props.blog, comments: comments.concat(this.state.comment)})
    
  }

  deleteBlog = (e) => {
    console.log("delete blog");
    e.stopPropagation();
    this.props.deleteBlog()
  }
  onFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

 

render () {
    const comments = this.props.blog.comments ? this.props.blog.comments : []
    return (
      this.props.extended ? 
      <div className="box">
        
        <h1 className="title">{this.props.blog.title}  |   by:{this.props.blog.author}</h1>
        <br/><a aref={this.props.blog.url}>{this.props.blog.url}</a>
        <p className="title">{this.props.blog.likes} likes</p> <button className="likeButton" onClick={this.likeBlog}>like</button>
        <p className="adderText" >added by {this.props.blog.user ? this.props.blog.user.name : 'anonymous'}</p>
        {
          
          ( this.props.user && this.props.user.id === this.props.blog.user["_id"]) ? 
            <button className="deleteButton" onClick={this.deleteBlog}>delete</button> : ''
          

        }
        <div className="box">
          <h1>Comments</h1>
          <div className="box">
            {
              comments.length === 0 ? <p>No comments</p> : 
              comments.map((n, index) => <li key={index}>{n}</li>)
            }
          </div>
          <form>
            <label className="label">Add comment</label>
            <input 
              className="input" 
              key="comment"
              name="comment"
              type="text"
              onChange={this.onFieldChange}
            />
            <button className="button is-primary" onClick={this.postComment}>Create</button>

          </form>
        </div>
      </div> 
      :
      <div className="panel-block" >
          <Link to={`/blogs/${this.props.blog.id}`}>{this.props.blog.title}  |   by:{this.props.blog.author}</Link>
      </div> 
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog