
import React from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog.js'
class BlogList extends React.Component {
  constructor(props) {
    super(props)
  }

render () {
    return (
      
      <div className="panel">
        {
            this.props.blogs.sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog likeBlog={() => this.props.likeBlog(blog)} deleteBlog={() => this.props.deleteBlog(blog)} key={blog.id} blog={blog} user={this.props.user} extended={false}/>
            )
        }
    
      </div> 
    )
  }
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default BlogList