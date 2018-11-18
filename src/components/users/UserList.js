
import React from 'react'
import { BrowserRouter as  Link } from 'react-router-dom'

import PropTypes from 'prop-types'
class UserList extends React.Component {
  constructor(props) {
    super(props)
  }

render () {
    return (
      <div>
        <table className="table  is-bordered">
            <thead className="thead">
                <tr>
                    <td >Name</td>
                    <td >Blogs added</td>
                </tr>
            </thead>
            <tbody>

                {
                    this.props.users.sort((a,b) => b.blogs.lenght - a.blogs.lenght).map(user =>
                        <tr key={user.id}>
                            <td >
                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                            </td>
                            <td >{user.blogs.length}</td>
                        </tr>
                    )
                }

            </tbody>
        </table>
    
      </div> 
    )
  }
}

export default UserList