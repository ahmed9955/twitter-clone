import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CommentOutlined, FavoriteBorder, FavoriteRounded, ShareOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setCommentDislike, setCommentLike } from '../../apiClient/comment'
import { profile } from '../../apiClient/user'
import { setPostDetails, setReplayContent, setTwitterReplayVisibility } from '../../redux/modal/action'
import CommentModal from './comment-modal'
import '../../styles/components/comment.scss'
import { withRouter } from 'react-router'
import { setReplayLike } from '../../apiClient/replay'
import io from 'socket.io-client'

const socket = io('http://localhost:2000')


class Comment extends React.Component {

    // const [liked, setLiked] = useState(false)
    // const [likesNum, setLikesNum] = useState(likes?likes.length:'')

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
            
            socket.emit('notifications', {
                
                sender: {
                
                name: this.props.user_id.user.profileName,
                avatar: this.props.user_id.user.avatar

            }, 
                reciever: this.props.profileName.id, 
                notification: `likes your replay ${this.props.content}`})

            console.log(like, 'like comment')

        } else {
            
            like = await setCommentLike(this.props._id)

            socket.emit('notifications', {sender: {
                name: this.props.user_id.user.profileName,
                avatar: this.props.user_id.user.avatar
            },
                reciever: this.props.profileName.id , notification: `likes your comment ${this.props.content}`})

            console.log(like)
    
        }
        
        if (like.like || like.likes){

            await this.setState({liked: true})
            await this.setState({likesNumText: this.state.likes.length+1})


        } else {
            if (this.props.type === 'comment'){
                const dislike = await setCommentDislike(this.props._id)
                if (dislike.success){
                    console.log(dislike)
                    await this.setState({liked: false})
                    await this.setState({likesNumText: this.state.likes.length-1 == -1 ?0:this.state.likes.length-1})
                  
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
            type: 'replay',
            creator_id_for_comment: this.props.creator
        })

    }

    handleCommentClick = () => {

        this.props.history.push('/home/comment_details')
        
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

    }


render(){
    
    const {content, media,profileName, _id, replays} = this.props
    const {liked} = this.state

    return(
        <>

        <div className="comment-container" onClick={this.handleCommentClick}>
                <div style={{display:'flex',margin:'20px'}}>
                    <img style={{borderRadius:'50%'}} width='48px' height='48px' src={media}/>
                    <div style={{marginLeft:'10px',display:'flex', flexDirection:'column'}}>
                    <span style={{ fontWeight: 'bold' }} >{profileName.profileName}</span>
                    <input style={{ border:'none', outline:'none' }} value={content} readOnly />
                </div>

                </div>
                <div style={{marginBottom:'20px'}} className = 'post-reactions'>
                   {this.props.type === 'comment' && <span onClick={this.handleComment} ><CommentOutlined />{replays?replays.length:''}</span>} 
                   <span><FontAwesomeIcon icon={faRetweet} />0</span>
                   <span onClick={this.handleLike} style = {{ color : liked  ?'#E44D77': 'black'}} >{ liked ?<FavoriteRounded/>:<FavoriteBorder />}<section>{this.state.likesNumText}</section></span>
                   <span ><ShareOutlined/>0</span>
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