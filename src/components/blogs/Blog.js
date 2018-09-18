import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      extended: false
    }
  }
 
  toggleExtended = () => {
    this.setState({extended: !this.state.extended})
  }
  likeBlog = (e) => {
    e.stopPropagation();

    this.props.likeBlog()
  }

  deleteBlog = (e) => {
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
      this.state.extended ? 
      <div 
        className='extendedDiv'
        style={this.style} 
        onClick={this.toggleExtended}>
        
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
        style={this.style} 
        onClick={this.toggleExtended}>
        {this.props.blog.title}  |   by:{this.props.blog.author}
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