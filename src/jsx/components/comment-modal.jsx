import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../apiClient/post'
import { addReplayToReplay } from '../../apiClient/replay'
import {  setTwitterReplayVisibility } from '../../redux/modal/action'
import Modal from './modal'
import TwitterLargeButton from './twitter-large-button'
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';
import io from 'socket.io-client'
import { profile } from '../../apiClient/user'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'

const socket = io('http://localhost:2000')


const CommentModal = ({postDetails,replayContent,type,post_content,post_id, creator_id, displayReplayVisibility, setTwitterReplayVisibility, profileName, avatar, user_avatar}) => {

    const [comment , setComment] = useState('')
    const [current_user, setUser] = useState('')
    const [displayEmoj, setDisplayEmoj] = useState(false)


    useEffect(async ()=> {

            const user =  await profile(localStorage.token)  

            setUser(user)

})

    const handleClick = () => {

        socket.emit('notifications', {sender: '', reciever: '', notification: ''})        

        if (type === 'replay'){
            
            addReplayToReplay(comment, post_id)

                
                socket.emit('notifications', {sender:{
                    name: current_user.profileName,
                    avatar: current_user.avatar,
                    content: post_content,
                    commentId: replayContent.post_id                  
                }, reciever: replayContent.creator_id_for_comment, notification: 'replay on your comment'})

                socket.emit('notificationsCount', replayContent.creator_id_for_comment)


        } else {


            addComment(comment, post_id)

            if (creator_id){
                

                socket.emit('notifications', {sender:{
                    name: current_user.profileName, 
                    avatar: current_user.avatar,
                    content: post_content,
                    postId: post_id
                }
                    , reciever: creator_id._id, notification: 'comment on your post'})

                    socket.emit('notificationsCount', creator_id._id)
            } else {

                socket.emit('notifications', {sender: {
                    name: current_user.profileName,
                    avatar: current_user.avatar,
                    content: post_content,
                    postId: post_id
                }, 
                    reciever: replayContent.creator_id._id, notification: 'comment on your post'})

                    socket.emit('notificationsCount', replayContent.creator_id._id)

            }

        }
        
        setComment('')
        setTwitterReplayVisibility(false)
        window.location.reload()
    }

    const handleChange = (e) => {

        setComment(e.target.value)
    
    }

    const handleEmojClick = () => {
        setDisplayEmoj(!displayEmoj)
    }

    const onEmojiClick = (event, emojiObject) => {
    
        setComment(prev => prev+emojiObject.emoji)
      
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

                <div style={{float:'right', width: '90%', wordWrap: 'break-word', }} >
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
                    
                    <textarea onFocus={() => setDisplayEmoj(false)} name="content" value={comment} onChange={handleChange}   className="post-input-field" placeholder="Tweet Your Replay" />                    
                </div>
                <div style={{
                    marginTop:'20px', 
                    textAlign:'end', 
                    height:'fit-content',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    fontSize: '30px',
                    
                    }}>
                    <div style={{marginRight: '14px', color:'#1991DA'}} onClick={handleEmojClick}><FontAwesomeIcon icon={faSmile}/></div>
                    <TwitterLargeButton title="replay" width="80px" handleClick={handleClick}/>                
 
                </div>
                <div style={{
                borderRadius: '0',
                position: 'absolute',
                top: '100px',
                left: '220px',
                textAlign: 'center',
                zIndex:'211',
                display: displayEmoj?'block':'none'
                }}>
                
                <Picker  onEmojiClick={onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
            
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