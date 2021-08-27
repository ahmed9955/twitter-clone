import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CommentOutlined, FavoriteBorder, FavoriteRounded, ShareOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import CommentModal from './comment-modal'

const Comment = ({content, media,profileName}) => {

    const [liked, setLiked] = useState(false)
    // const [likesNum, setLikesNum] = useState(likes?likes.length:'')


    return(
        <>

        <div>
                <div style={{display:'flex',margin:'20px'}}>
                    <img style={{borderRadius:'50%'}} width='48px' height='48px' src={media}/>
                    <div style={{marginLeft:'10px',display:'flex', flexDirection:'column'}}>
                    <span>{profileName}</span>
                    <input style={{ border:'none', outline:'none' }} value={content} readOnly />
                </div>

                </div>
                <div style={{marginBottom:'20px'}} className = 'post-reactions'>
                   <span ><CommentOutlined /> 1</span>
                   <span><FontAwesomeIcon icon={faRetweet} /> 1</span>
                   <span style = {{ color : liked  ?'#E44D77': 'black'}} >{ liked ?<FavoriteRounded/>:<FavoriteBorder />}<section>1</section></span>
                   <span ><ShareOutlined/>1</span>
                </div>
        </div>
        </>
    )
}

export default Comment