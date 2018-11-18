import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Link } from 'react-router-dom'

class Blog extends React.Component {
  constructor(props) {
    super(props)
  }
 
  
  likeBlog = (e) => {
    e.stopPropagation();
    console.log("like blog");
    this.props.likeBlog()
  }

  deleteBlog = (e) => {
    console.log("delete blog");
    e.stopPropagation();
    this.props.deleteBlog()
  }

 style = {
  border: '1px solid black',
  padding: 2,
  marginTop: 5,
}

render () {
    return (
      this.props.extended ? 
      <div 
        className='extendedDiv'
        style={this.style} >
        
        {this.props.blog.title}  |   by:{this.props.blog.author}
        <br/><a aref={this.props.blog.url}>{this.props.blog.url}</a>
        <p>{this.props.blog.likes} likes</p> <button className="likeButton" onClick={this.likeBlog}>like</button>
        <p className="adderText" >added by {this.props.blog.user ? this.props.blog.user.name : 'anonymous'}</p>
        {
          
          (this.props.blog.user === undefined || this.props.user.id === this.props.blog.user["_id"]) ? 
            <button className="deleteButton" onClick={this.deleteBlog}>delete</button> : ''
          

        }
      </div> 
      :
      <div 
        className='compactDiv'
        style={this.style} >
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