import React from 'react'
const UserDetails = ({user}) => (
  <div>
    {
        user ? 
        <div>
            <h1>{user.name}</h1>
            <h2>Added blogs</h2>
            <ul>
                {
                    user.blogs.length > 0 ? 
                    (
                        user.blogs.map(blog => (
                            <li>
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