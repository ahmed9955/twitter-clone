import Modal  from '../components/modal'
import React from 'react'
import { connect } from 'react-redux'
import { setTweetModalVisibility } from '../../redux/modal/action'
import CreatePost from './create-post'

const TweetModal = ({displayTweetVisibility, setTwitterTweetVisibility}) => {

    return(
        <>
            <Modal height="fit-content" display= { displayTweetVisibility }  >
                <CreatePost  location="from-modal"/>
            </Modal>

        </>
    )
}

const mapStateToProps = state => ({
    displayTweetVisibility: state.modal.displayTweetModal,
})

const mapDispatchToProps = dispatch => ({

    setTwitterTweetVisibility: display => dispatch(setTweetModalVisibility(display)),
    
})


export default connect(mapStateToProps, mapDispatchToProps)(TweetModal)