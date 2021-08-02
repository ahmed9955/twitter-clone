import React from 'react'

import '../../styles/components/twitter-large-button.scss'

const TwitterLargeButton = ({handleClick, title, active}) => {

    return (
    <button type="button" disabled={active}  onClick={handleClick}  className = {!active?'twitter-button twitter-large-button':'twitter-large-button-disabled twitter-button'} >
    {title}
    </button>
    )
}

export default TwitterLargeButton

