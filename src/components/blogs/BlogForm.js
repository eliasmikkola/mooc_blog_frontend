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
            <div className="container">
            <h2 className="subtitle">Add new blog</h2>
            <form className="form">
                <div className="field">
                    <a className="label" >title</a>    
                        <input className="input" 
                            key="title"
                            name="title"
                            type="text"
                            onChange={this.onFieldChange}
                            />
                    </div>
                
                            
                <div className="field">
                    <a className="label">author</a>

                        <input className="input" 
                            key="author"
                            onChange={this.onFieldChange}
                            name="author"
                            type="text"
                            />
                            
                </div>
                <div className="field">
                    <a className="label">url</a>

                    <input className="input" 
                        key="url"
                        onChange={this.onFieldChange}
                        name="url"
                        type="text"
                        />
                        
                </div>
            </form>
            <button className="button is-success" onClick={this.postBlog}>Create</button>
            </div>
        )
    }
}
BlogForm.propTypes = {
    postBlog: PropTypes.func.isRequired
}
export default BlogForm