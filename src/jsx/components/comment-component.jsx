import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CommentOutlined, FavoriteBorder, FavoriteRounded, ShareOutlined, VerifiedUserTwoTone } from '@material-ui/icons'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setCommentDislike, setCommentLike } from '../../apiClient/comment'
import { profile } from '../../apiClient/user'
import { setPostDetails, setReplayContent, setTwitterReplayVisibility } from '../../redux/modal/action'
import CommentModal from './comment-modal'
import '../../styles/components/comment.scss'
import { withRouter } from 'react-router'
import { setReplayDisLike, setReplayLike } from '../../apiClient/replay'
import io from 'socket.io-client'
import { timeDifference } from '../../apiClient/time-diffrence'

const socket = io('http://localhost:2000')


class Comment extends React.Component {

    constructor(){
        super()
        this.state = {
            liked: false,
            likes: 0,
            likesNumText:0
        }
    }

    async componentDidMount() {

        const user = await profile(localStorage.token)

        await this.setState({likes: this.props.likes})
        await this.setState({likesNumText: this.state.likes.length})

        if (this.props.user_id.user){
            if (this.state.likes.length !== 0){
                if (user){
                    const checkUser =  this.state.likes.includes(user._id)
                    if(checkUser){
                        await this.setState({liked: true})
                    }
                }                
            } 
        } 

    }

    handleLike = async (e) => {

        e.stopPropagation();
        
        let like = null

        if (this.props.type === 'replay'){

        
            like = await setReplayLike(this.props._id)            
            
            if (!like.liked){
            socket.emit('notifications', {
                
                sender: {
                
                name: this.props.user_id.user.profileName,
                avatar: this.props.user_id.user.avatar,
                content: this.props.content,
                commentId: this.props.commentId

            }, 
                reciever: this.props.profileName._id , 
                notification: `likes your replay`})

            console.log(like, 'like comment')

            socket.emit('notificationsCount', this.props.profileName._id)
        }
        } else {
            
            like = await setCommentLike(this.props._id)
            
            if(!like.liked) {

            socket.emit('notifications', {sender: {
                name: this.props.user_id.user.profileName,
                avatar: this.props.user_id.user.avatar,
                content: this.props.content,
                postId: this.props.postId
            },
                reciever: this.props.profileName._id , notification: `likes your comment`})
            
                socket.emit('notificationsCount', this.props.profileName._id)
        }
        }
        
        if (like.like || like.likes){

            await this.setState({liked: true})
            await this.setState({likesNumText: this.state.likesNumText+1})

        } else {
            if (this.props.type === 'comment'){
                const dislike = await setCommentDislike(this.props._id)
                
                console.log(dislike)

                if (dislike.success){
                    
                    await this.setState({liked: false})
                
                    await this.setState({likesNumText: this.state.likes.length === this.state.likesNumText?this.state.likes.length-1:this.state.likes.length})
                    
                    await this.setState({likes: this.state.likes})
    

                }
            } else{

                const dislike = await setReplayDisLike(this.props._id)
                
                
                if (dislike.success){

                    await this.setState({liked: false})                
                    await this.setState({likesNumText: this.state.likes.length === this.state.likesNumText?this.state.likes.length-1:this.state.likes.length})
                    await this.setState({likes: this.state.likes})
        
                }
            }
            
        }
    }


    handleComment = (e) => {

        e.stopPropagation();
        
        this.props.setTwitterReplayVisibility(true)

        this.props.setReplayContent({

            post_id: this.props._id,
            post_content: this.props.content,
            avatar: this.props.media,
            profileName: this.props.profileName.profileName,
            type: 'replay',
            creator_id_for_comment: this.props.creator,
            user_avatar: this.props.user_id.user.avatar,
        
        })

    }

    handleCommentClick = () => {
       
        const {

            _id, 
            content, 
            likes,
            profileName,
            media,
            replays

        } = this.props

        this.props.setPostDetails({

            id: _id, 
            content, 
            likes,
            profileName,
            avatar: media,
            comments: replays

        })

        this.props.history.push(`/home/comment_details/${_id}`)
    }


render(){
    
    const {content, media,profileName, _id, replays,created_at} = this.props
    const { liked } = this.state

    return(
        <>

        <div className="comment-container" onClick={this.handleCommentClick}>
                <div style={{display:'flex',margin:'20px'}}>
                    <img style={{borderRadius:'50%'}} width='48px' height='48px' src={media}/>
                    <div style={{marginLeft:'10px',display:'flex', flexDirection:'column'}}>
                    <span style={{ fontWeight: 'bold'}} >{profileName.profileName} <span style={{fontWeight: 'normal', position:'relative', top: '1px', color: '#1991DA'}} ><VerifiedUserTwoTone/>@{profileName.profileName} { timeDifference(created_at) }</span></span>
                    <div style={{ 
                        border:'none', 
                        outline:'none', 
                        textAlign:'start', 
                        wordWrap: 'break-word', 
                        fontFamily: 'sans-serif',
                        width: '540px'  
                    }}>{content}</div>
                </div>

                </div>
                <div style={{marginBottom:'20px'}} className = 'post-reactions'>
                   {this.props.type === 'comment' && <span onClick={this.handleComment} ><CommentOutlined />{replays?replays.length:''}</span>} 
                   <span><FontAwesomeIcon icon={faRetweet} />0</span>
                   <span onClick={this.handleLike} style = {{ color : liked  ?'#E44D77': 'black'}} >{ liked ?<FavoriteRounded/>:<FavoriteBorder />}<section>{this.state.likesNumText}</section></span>
                   <span ><ShareOutlined/></span>
                </div>
        </div>
        </>
    )
}}

const mapStateToProps = state => ({
    user_id: state.user
})

const mapDispatchToProps = dispatch => ({

    setTwitterReplayVisibility: display => dispatch(setTwitterReplayVisibility(display)),
    setReplayContent: content => dispatch(setReplayContent(content)),
    setPostDetails: details => dispatch(setPostDetails(details))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comment))