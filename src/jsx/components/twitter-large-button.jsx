import React from 'react'
import { connect } from 'react-redux'

import '../../styles/components/twitter-large-button.scss'

const TwitterLargeButton = ({handleClick, title, buttonActive}) => {

    return (
    <button type="button" disabled={buttonActive}  onClick={handleClick}  className = {!buttonActive?'twitter-button twitter-large-button':'twitter-large-button-disabled twitter-button'} >
    {title}
    </button>
    )
}

const mapStateToProps = state => ({
    buttonActive: state.modal.twitterButtonActive
})

export default connect(mapStateToProps)(TwitterLargeButton)

