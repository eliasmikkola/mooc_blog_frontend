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
            <div class="container">
            <h2 class="subtitle">Add new blog</h2>
            <form class="form">
                <div class="field">
                    <a class="label" >title</a>    
                        <input class="input" 
                            key="title"
                            name="title"
                            type="text"
                            onChange={this.onFieldChange}
                            />
                    </div>
                
                            
                <div class="field">
                    <a class="label">author</a>

                        <input class="input" 
                            key="author"
                            onChange={this.onFieldChange}
                            name="author"
                            type="text"
                            />
                            
                </div>
                <div class="field">
                    <a class="label">url</a>

                    <input class="input" 
                        key="url"
                        onChange={this.onFieldChange}
                        name="url"
                        type="text"
                        />
                        
                </div>
            </form>
            <button class="button is-success" onClick={this.postBlog}>Create</button>
            </div>
        )
    }
}
BlogForm.propTypes = {
    postBlog: PropTypes.func.isRequired
}
export default BlogForm