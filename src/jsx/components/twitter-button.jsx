import React from 'react'

import '../../styles/components/twitter-button.scss'

const TwitterButton = ({children,outline}) => {

    return (
        <button className= {`twitter-button ${outline}`}>{children}</button>
    )
}

export default TwitterButton