import React from 'react'


const Alert = ({alert}) => {
    const color = alert.severity === 'danger' ? 'red' : 'green' /* Red */
    const styles =  {
        'padding':'10px',
        'border': `1px solid ${color}`,
        'border-color': color,
        'color':color,
        'margin-bottom':'15px',
        'width': '100%'
    }
    
    return (
    <div style={styles}>
        <p>{alert.title}</p>
     </div>
)}

export default Alert