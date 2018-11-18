
import React from 'react'
import PropTypes from 'prop-types'
class UserList extends React.Component {
  constructor(props) {
    super(props)
  }

render () {
    return (
      <div>
        <table>
            <thead>
                <tr>
                    <td >Name</td>
                    <td >Blogs added</td>
                </tr>
            </thead>
            {
                this.props.users.sort((a,b) => b.blogs.lenght - a.blogs.lenght).map(user =>
                    <tr>
                        <td >{user.name}</td>
                        <td >{user.blogs.length}</td>
                    </tr>
                )
            }

        </table>
    
      </div> 
    )
  }
}

export default UserList