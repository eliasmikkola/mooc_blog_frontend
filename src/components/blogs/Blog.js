import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      extended: false
    }
  }
  componentDidMount = () =>  {
    console.log(this.props.user, this.props.blog);
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
      <div style={this.style} onClick={this.toggleExtended}>
        {this.props.blog.title}  |   by:{this.props.blog.author}
        <br/><a aref={this.props.blog.url}>{this.props.blog.url}</a>
        <p>{this.props.blog.likes} likes</p> <button onClick={this.likeBlog}>like</button>
        <p>added by {this.props.blog.user.name}</p>
        {
          
          (this.props.user.id === this.props.blog.user["_id"]) ? 
            <button onClick={this.deleteBlog}>delete</button> : ''
          

        }
      </div> 
      :
      <div style={this.style} onClick={this.toggleExtended}>
        {this.props.blog.title}  |   by:{this.props.blog.author}
      </div> 
    )
  }
}

export default Blog