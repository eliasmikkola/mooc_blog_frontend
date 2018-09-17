import React from 'react'
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
                <input
                    key="title"
                    name="title"
                    type="text"
                    onChange={this.onFieldChange}
                /><br/>
                <label>author</label>
                <input
                    key="author"
                    onChange={this.onFieldChange}
                    name="author"
                    type="text"
                /><br/>
                <label>url</label>
                <input
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

export default BlogForm