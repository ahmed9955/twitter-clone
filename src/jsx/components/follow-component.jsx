import React, { useState } from 'react'
import { connect } from 'react-redux'
import { acceptFollow, requestFollow, unfollow } from '../../apiClient/follow'

import '../../styles/components/follow-component.scss'


const FollowComponent = ({type,user,_id, profileName, tagname, avatar, followType}) => {
    

    const [followText, setFollowText] = useState('following')
    const [displyFollowButton, setDiplayFollowButton] = useState(false)
    
    useState(() => {
        
        if ( followType === 'following'){
            setDiplayFollowButton(true)
        }
        

    }, [])

    const handleHover = () => {

        setFollowText('unFollow')
    }

    const handleLeave = () => {

        setFollowText('following')
    }

    const handleFollowClick = async (e) => {
        if (!displyFollowButton) {

            if (followType === 'followers'){
                setDiplayFollowButton(true)
                acceptFollow(_id)
            } else{
                setDiplayFollowButton(true)
                requestFollow(_id)    
            }

    } 

}

const handleUnfollowClick = () => {

    setDiplayFollowButton(false)
    unfollow(_id)
    console.log(_id)
    
}


    return(

        <>
         <div style={{display:'flex',margin:'20px',width:'90%'}}>
                <img style={{borderRadius:'50%'}} width='48px' height='48px' src={avatar} />
                 <div style={{flex:'1',marginLeft:'10px',display:'flex', flexDirection:'column'}}>
                    <span>{profileName}</span>
                    <span style={{fontFamily: 'sans-serif', color: 'gray'}}>@{profileName}</span>
                </div>

                {type !== 'notUser' &&

                <div className="follow-button" style={{
                display: !displyFollowButton?'block':'none'
                ,background:'black',
                color:'white'
                }} onClick={ handleFollowClick } >
                    follow
                </div>
                }
            <div style={{display: displyFollowButton?'block':'none'}} onClick={handleUnfollowClick} className={`${followText}` == 'unFollow'?'following-trans follow-button':'follow-button'} onMouseEnter={handleHover} onMouseLeave={handleLeave}  >{followText}</div>
         </div>       
         
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps)(FollowComponent)