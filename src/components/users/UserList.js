
import React from 'react'
import { NavLink } from 'react-router-dom'

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
                                <NavLink to={`users/${user.id}`}>{user.name}</NavLink>
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