import React from 'react'


const Alert = ({alert}) => {
    const color = alert.severity === 'danger' ? 'red' : 'green' /* Red */
    const styles =  {
        'padding':'10px',
        'border': `1px solid ${color}`,
        'borderColor': color,
        'color':color,
        'marginBottom':'15px',
        'width': '100%'
    }
    
    return (
    <div style={styles}>
        <p>{alert.title}</p>
     </div>
)}

export default Alert