import React from 'react'

import '../../styles/components/twitter-large-button.scss'

const TwitterLargeButton = ({handleClick, title}) => {

    return (
    <button onClick={handleClick}   className = 'twitter-button twitter-large-button'>
    {title}
    </button>
    )
}

export default TwitterLargeButton

