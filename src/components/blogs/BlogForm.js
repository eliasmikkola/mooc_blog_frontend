import React from 'react'
import PropTypes from 'prop-types'

class BlogForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        blogs: [],
        title: '',
        author: '',
        url:''
      }
    }

    postBlog = () => {
        
        this.props.postBlog({
            title: this.state.title,
            author: this.state.author,
            url: this.state.url
        })
        this.setState({
            title: '',
            author: '',
            url:''
        })
    }
    onFieldChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
    render() {
        return (
            <div>
            <h2>create new</h2>
            <form >
                <label >title</label>
                <input style={this.props.inputStyle}
                    key="title"
                    name="title"
                    type="text"
                    onChange={this.onFieldChange}
                /><br/>
                <label>author</label>
                <input style={this.props.inputStyle}
                    key="author"
                    onChange={this.onFieldChange}
                    name="author"
                    type="text"
                /><br/>
                <label>url</label>
                <input style={this.props.inputStyle}
                    key="url"
                    onChange={this.onFieldChange}
                    name="url"
                    type="text"
                />
            </form>
            <button onClick={this.postBlog}>Create</button>
            </div>
        )
    }
}
BlogForm.propTypes = {
    postBlog: PropTypes.func.isRequired
}
export default BlogForm