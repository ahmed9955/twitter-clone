import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../apiClient/post'
import { addReplayToReplay } from '../../apiClient/replay'
import {  setTwitterReplayVisibility } from '../../redux/modal/action'
import Modal from './modal'
import TwitterLargeButton from './twitter-large-button'

import io from 'socket.io-client'
import { profile } from '../../apiClient/user'

const socket = io('http://localhost:2000')


const CommentModal = ({postDetails,replayContent,type,post_content,post_id, creator_id, displayReplayVisibility, setTwitterReplayVisibility, profileName, avatar, user_avatar}) => {

    const [comment , setComment] = useState('')
    const [current_user, setUser] = useState('')

    useEffect(async ()=> {

            const user =  await profile(localStorage.token)  

            setUser(user)
         
            // console.log('CommentModal', current_user)

})

    const handleClick = () => {

        socket.emit('notifications', {sender: '', reciever: '', notification: ''})        

        if (type === 'replay'){
            
            addReplayToReplay(comment, post_id)

                
                socket.emit('notifications', {sender: current_user.profileName, reciever: replayContent.creator_id_for_comment, notification: 'replay on your comment'})


        } else {


            addComment(comment, post_id)

            if (creator_id){

                socket.emit('notifications', {sender: current_user.profileName, reciever: creator_id._id, notification: 'comment on your post'})

            } else {

                socket.emit('notifications', {sender: current_user.profileName, reciever: postDetails.creator_id._id, notification: 'comment on your post'})

            }

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
    type: state.modal.replayContent.type,
    user: state.user.current_user,
    replayContent: state.modal.replayContent,
    postDetails: state.modal.postDetails
})

const mapDispatchToProps = dispatch => ({

    setTwitterReplayVisibility: display => dispatch(setTwitterReplayVisibility(display))

})


export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)