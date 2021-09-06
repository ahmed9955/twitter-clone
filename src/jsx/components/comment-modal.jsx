import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../apiClient/post'
import { addReplayToReplay } from '../../apiClient/replay'
import {  setTwitterReplayVisibility } from '../../redux/modal/action'
import Modal from './modal'
import TwitterLargeButton from './twitter-large-button'

const CommentModal = ({type,post_content,post_id, displayReplayVisibility, setTwitterReplayVisibility, profileName, avatar, user_avatar}) => {

    const [comment , setComment] = useState('')

    const handleClick = () => {

        if (type === 'replay'){
            addReplayToReplay(comment, post_id)
        } else {


            addComment(comment, post_id)
        
        }
        
        setComment('')
        setTwitterReplayVisibility(false)
        
    }

    const handleChange = (e) => {

        setComment(e.target.value)
    
    }

    return(
        <>
            <Modal height="fit-content" display= { displayReplayVisibility }  >
                <div>
                    <div>

                    <img style={{borderRadius:'50%',marginRight:'10px'}} width='48px' height='48px' src={avatar}/>
                    <span>{profileName}</span>

                </div>

                <div style={{position:'absolute', left:'52px',height:'109px', width:'3px', background:'#CFD9DE'}}>

                </div>

                <div style={{float:'right'}} >
                    {post_content}
                </div>
                </div>
                <div style={{display: 'flex', flexDirection:'row',marginTop:'109px'}}>
                    <img style={{
                        borderRadius:'50%',
                        marginRight:'10px'
                        }} 
                        width='48px' 
                        height='48px' 
                        src= {user_avatar} />
                    
                    <textarea name="content" value={comment} onChange={handleChange}   className="post-input-field" placeholder="Tweet Your Replay" />                    
                </div>
                <div style={{marginTop:'20px', textAlign:'end', height:'fit-content'}}>
                    <TwitterLargeButton title="replay" width="80px" handleClick={handleClick}/>                
                </div>
            </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    displayReplayVisibility: state.modal.displayReplayVisibility,
    type: state.modal.replayContent.type
})

const mapDispatchToProps = dispatch => ({

    setTwitterReplayVisibility: display => dispatch(setTwitterReplayVisibility(display))

})


export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)