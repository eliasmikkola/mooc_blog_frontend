import React from 'react'

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

 style = {
  border: '1px solid black',
  padding: 2,
  marginTop: 5,
}

render () {
    return (
      this.state.extended ? 
      <div style={this.style} onClick={this.toggleExtended}>
        {this.props.blog.title}  |   by:{this.props.blog.author}
        <br/><a aref={this.props.blog.url}>{this.props.blog.url}</a>
        <p>{this.props.blog.likes} likes</p> <button>like</button>
        <p>added by {this.props.blog.user.name}</p>
      </div> 
      :
      <div style={this.style} onClick={this.toggleExtended}>
        {this.props.blog.title}  |   by:{this.props.blog.author}
      </div> 
    )
  }
}

export default Blog