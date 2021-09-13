import React, { useEffect, useState } from 'react'
import '../../styles/components/post.scss'
import { FavoriteBorder, FavoriteRounded,CommentOutlined, ShareOutlined, VerifiedUser, VerifiedUserRounded, VerifiedUserSharp, VerifiedUserTwoTone, Bookmark, ShareSharp } from '@material-ui/icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setPostDetails, setReplayContent, setTwitterReplayVisibility } from '../../redux/modal/action';
import { connect } from 'react-redux';
import { setLikedPost, setDisLikedPost } from '../../apiClient/post';
import { withRouter } from 'react-router';
import { profile } from '../../apiClient/user';
import io from 'socket.io-client'
import { timeDifference } from '../../apiClient/time-diffrence';
import BookMarkPopUp from './book-marks-popup';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { addToBookmark, getBookmark } from '../../apiClient/bookmarks';

const socket = io('http://localhost:2000')

class Post extends React.Component {

    constructor(){
        super()
        this.state = {

            flag: false,
            liked: false,
            likesNum: 0,
            commentsNum:'',
            likesNumText:0,
            commentsNum:0,
            displayBookMarkPopup: false

        }
    }

   async  componentDidMount(){

        const user = await profile(localStorage.token)
            
        await this.setState({likesNum: this.props.likes})
        await this.setState({commentsNum: this.props.comments.length})
        await this.setState({likesNumText: this.state.likesNum.length})

        if (this.props.user_id.user){
            if (this.state.likesNum.length !== 0){
                if (user){
                    const checkUser =  this.state.likesNum.includes(user._id)
                    if(checkUser){
                        await this.setState({liked: true})
                }
                
        }
}}

}
    
    handleIncreaseComments = async () => {

        await this.setState({commentsNum: this.props.comments.length+1})
    
    }    

    handleComment = (e) => {

        e.stopPropagation();
        const {content,id, profileName, avatar, user_id,creator} = this.props
        
        this.props.setTwitterReplayVisibility(true)

        this.props.setReplayContent({
            post_id: id,
            post_content: content,
            type: 'comment',
            profileName,
            avatar,
            user_avatar: user_id.user.avatar,
            creator_id: creator
        })

    }

    handleLike = async (e) => {

        e.stopPropagation();

        
        const like = await setLikedPost(this.props.id)

        if (like.like){

            await this.setState({liked: true})
                        
            await this.setState({likesNumText: this.state.likesNumText+1})


            if (this.props.creator){

                socket.emit('notifications', {
                    sender: {
                        name: this.props.user_id.user.profileName,
                        avatar: this.props.user_id.user.avatar,
                        content: this.props.content,
                        postId: this.props.id
                    }
                
                , reciever: this.props.creator._id, 
                notification: `likes your post`})
                    
                socket.emit('notificationsCount', this.props.creator._id)
            
            } else {

                socket.emit('notifications', {
                    sender:{
                        
                        name: this.props.user_id.user.profileName,
                        avatar: this.props.user_id.user.avatar,
                        content: this.props.content,
                        postId: this.props.id
                    }, 
                    reciever: this.props.id_user , 
                    notification: `likes your post`})

                    socket.emit('notificationsCount', this.props.id_user)

                }

            

        } else{

            const dislike = await setDisLikedPost(this.props.id)
            if (dislike.success){

                await this.setState({liked: false})
                
                await this.setState({likesNumText: this.state.likesNum.length === this.state.likesNumText?this.state.likesNum.length-1:this.state.likesNum.length})
                
                await this.setState({likesNum: this.state.likesNum})
            }}

       

    }

    handlePostClick = () => {


        const {

            id, 
            content, 
            media,
            likes,
            profileName,
            avatar,
            comments,
            creator,
            created_at

        } = this.props

        this.props.setPostDetails({

            id, 
            content, 
            media,
            likes,
            profileName,
            avatar,
            comments,
            creator_id: creator,
            created_at,
        })

        this.props.history.push(`/home/post_details/${id}`)

    }

    handlePostImgClick = (e) => {
        e.stopPropagation();

        this.props.history.push(`/home/profile/${this.props.id_user}`)
  
    }


    handleShareClick = (e) => {
        e.stopPropagation()
        this.setState({displayBookMarkPopup: !this.state.displayBookMarkPopup})
    }
    
    handleAddToBookmarkClick = (e, id) => {
        e.stopPropagation()
        this.setState({displayBookMarkPopup: !this.state.displayBookMarkPopup})

        addToBookmark(id)
        
    }

    handleCopyLinkToTweet = (e) => {

        e.stopPropagation()
        this.setState({displayBookMarkPopup: !this.state.displayBookMarkPopup})

    }



render(){

    const { id,profileName, avatar, content, media, created_at } = this.props

    return(
    
    <>
            <div  className="post-container"  onClick={this.handlePostClick}>
                <div className="post-owner">
                    <img onClick = {this.handlePostImgClick} style={{borderRadius:'50%',marginRight:'10px'}} width='48px' height='48px' src={avatar}/>
                    <span>{profileName} <span style={{fontWeight: 'normal', position:'relative', top: '1px', color: '#1991DA'}} > <VerifiedUserTwoTone/>@{profileName} {  timeDifference(created_at) }</span></span>
                </div>
                <div className="post-content"  style={{
                    backgroundColor: 'inherit',
                    cursor: 'pointer',
                }} 
                 >{content}</div>
                {
                media?
                !media.endsWith('.mp4') && media 
                 && 
                    <img
                        src={media} 
                        height='280px' 
                        width='90%'
                        style={{border: '1px solid #cccc',borderRadius:'20px',marginLeft:'40px',marginRight:'40px'}}>
                    </img> : ''
                }

                {
                media?
                media.endsWith('.mp4') && 
                
                    <video
                        muted
                        controls
                        src={media} 
                        height='280px' 
                        width='85%'
                        style={{borderRadius:'20px', marginLeft:'40px'}}
                        onClick={(e) => e.stopPropagation()}
                        >
                    </video> : '' 
                }

                <div style={{marginBottom:'20px'}} className = 'post-reactions'>
                   <span onClick={this.handleComment}><CommentOutlined />{this.state.commentsNum}</span>
                   <span><FontAwesomeIcon icon={faRetweet} />0</span>
                   <span style = {{ color : this.state.liked  ?'#E44D77': 'black'}} onClick={this.handleLike} >{ this.state.liked ?<FavoriteRounded/>:<FavoriteBorder />}<section>{this.state.likesNumText}</section></span>
                   <span onClick={this.handleShareClick} ><ShareOutlined/></span>
                   <div style={{
                       width: '280px',
                       height: '100px',
                       zIndex: '5000',
                       marginTop: '7px',
                       backgroundColor: 'white', 
                       position:'absolute', 
                       right: '510px',
                       display: this.state.displayBookMarkPopup?'flex':'none',
                       flexDirection: 'column',
                       justifyContent: 'center',
                       padding: '10px',
                       color: 'black',
                       fontSize: '16px',
                       fontFamily: 'sans-serif',
                       }} onClick={(e) => {
                           e.stopPropagation()
                       }}>
                           
                           <div onClick={(e) => this.handleAddToBookmarkClick(e, id)}  style={{flex: '1', cursor: 'pointer',textAlign: 'start'}} >
                               <Bookmark/> Add Tweet To Bookmarks
                            </div>
                            <CopyToClipboard text = {`http://localhost:3000/home/post_details/${id}`} >

                           <div onClick= {(e) => this.handleCopyLinkToTweet(e, id)} style={{flex: '1', cursor: 'pointer'}}>\
                           <ShareSharp/> Copy Link To Tweet</div>
                           </CopyToClipboard>
                            
                       </div>

                </div>
                
            </div>
        </>
    )
}}

const mapStateToProps = state => ({
    user_id: state.user,
    postDetails: state.modal.postDetails
})

const mapDispatchToProps = dispatch => ({

    setTwitterReplayVisibility: display => dispatch(setTwitterReplayVisibility(display)),
    setReplayContent: content => dispatch(setReplayContent(content)),
    setPostDetails: details => dispatch(setPostDetails(details))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))