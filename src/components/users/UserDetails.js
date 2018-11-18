import React from 'react'
const UserDetails = ({user}) => (
  <div>
    {
        user ? 
        <div>
            <h1 className="title">{user.name}</h1>
            <h2 className="subtitle">Added blogs</h2>
            <ul>
                {
                    user.blogs.length > 0 ? 
                    (
                        user.blogs.map(blog => (
                            <li key={blog._id}>
                                <p>{blog.title} by: {blog.author}</p>
                            </li>
                        ))
                        )
                        : <p>No blogs </p>
                        
                    }
            </ul> 
        </div>
    :
    <p>no user found</p>
    }
  </div>  
)

export default UserDetails