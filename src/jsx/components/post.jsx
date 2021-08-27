import React, { useEffect, useState } from 'react'
import '../../styles/components/post.scss'
import { FavoriteBorder, FavoriteRounded,CommentOutlined, ShareOutlined } from '@material-ui/icons';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setPostDetails, setReplayContent, setTwitterReplayVisibility } from '../../redux/modal/action';
import { connect } from 'react-redux';
import { setLikedPost } from '../../apiClient/post';
import { withRouter } from 'react-router';


const Post = ({ profileName,avatar,history,setPostDetails,setReplayContent,user_id,setTwitterReplayVisibility,content,media,likes,comments,id}) => {

    const [liked, setLiked] = useState(false)
    const [likesNum, setLikesNum] = useState(likes?likes.length:'')
    const [commentsNum, setCommentsNum] = useState(comments?comments.length:'')
    

    useEffect(() => {

        if (user_id.user){

            if(likes){
            const checkUser =  likes.includes(user_id.user._id)
            if(checkUser){
            setLiked(true)
            }
        }}
       
    })


    const handleComment = (e) => {

        e.stopPropagation();

        setTwitterReplayVisibility(true)

        setReplayContent({
            post_id: id,
            post_content: content
        })

    }

    const handleLike = async (e) => {
        e.stopPropagation();

        const like = await setLikedPost(id)
        if (like){

            setLiked(true)
            setLikesNum(likes.length+1)
            console.log(like)
        
        }

    }

    const handlePostClick = () => {
        history.push(`/home/post_details`)
        setPostDetails({

            id, 
            content, 
            media,
            likes,
            profileName,
            avatar,
            comments
        })
    }

    return(
        <>
            <div  className="post-container" onClick={handlePostClick}>
                <div className="post-owner">
                    <img style={{borderRadius:'50%',marginRight:'10px'}} width='48px' height='48px' src={avatar}/>
                    <span>{profileName}</span>
                </div>
                <input className="post-content" value={content} readOnly />
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
                        controls
                        src={media} 
                        height='280px' 
                        width='500px'
                        style={{borderRadius:'20px'}}>
                    </video> : '' 
                }

                <div style={{marginBottom:'20px'}} className = 'post-reactions'>
                   <span onClick={handleComment}><CommentOutlined />{commentsNum}</span>
                   <span><FontAwesomeIcon icon={faRetweet} /> 1</span>
                   <span style = {{ color : liked  ?'#E44D77': 'black'}} onClick={handleLike}>{ liked ?<FavoriteRounded/>:<FavoriteBorder />}<section>{likesNum}</section></span>
                   <span ><ShareOutlined/>1</span>
                   {/* <CommentModal post_content={content} post_id={id}  /> */}
                   
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    user_id: state.user
})

const mapDispatchToProps = dispatch => ({

    setTwitterReplayVisibility: display => dispatch(setTwitterReplayVisibility(display)),
    setReplayContent: content => dispatch(setReplayContent(content)),
    setPostDetails: details => dispatch(setPostDetails(details))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))