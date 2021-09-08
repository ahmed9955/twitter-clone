import { faCriticalRole, faEvernote, faGgCircle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAdjust, faBell, faBookmark, faBookReader, faCommentDots, faDotCircle, faEnvelope, faHashtag, faHome, faInfoCircle, faList, faNotesMedical, faSearch, faThList, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { avatar, logOut, URL } from '../../apiClient/user'

import '../../styles/components/side-nav-bar.scss'
import TwitterLargeButton from './twitter-large-button'



const SideNavBar = ({history, user_id}) => {

    const [URL,setURL] = useState('http://localhost:3000/')
    
    const [avatarPro, setAvatarProfile] = useState('')

    const [displayLogout, setDisplayLogout] = useState(false)

    useEffect(async () => {
        
        const avatarProfile = await  avatar(localStorage.token)

        if (avatarProfile){
            setAvatarProfile(avatarProfile) 
            
        } else {
            setAvatarProfile('https://pbs.twimg.com/profile_images/1429509461320818689/kAYGSvpx_400x400.png')
        }
    })

    const handleLogOutClick = async () => {

        const response = logOut()

        response.then((res) => {
            if (res.user){
                
                localStorage.removeItem('token')
                history.push('/')               
                window.location.href = URL
                
            }
        } )

    }

    return(
        <>
            <div className="side-navbar-container">
                <nav className="nav-links">
                    <a style={{color:'#1DA1F2'}}>
                        <FontAwesomeIcon  icon={faTwitter}/>
                        </a>
                    <a href="/home" ><section><FontAwesomeIcon icon={faHome}/></section><span>Home</span></a>
                    <a href="/home/explore"><section><FontAwesomeIcon icon={faHashtag}/></section><span>Explore</span></a>
                    <a href="/home/notification"><section><FontAwesomeIcon icon={faBell}/></section><span>Notification</span></a>
                    <a href="/home/messages"><section><FontAwesomeIcon icon={faEnvelope}/></section><span>Messages</span></a>
                    <a href="/home/bookmarks"><section><FontAwesomeIcon icon={faBookmark}/></section><span>Bookmarks</span></a>
                    <a href="/home/lists"><section><FontAwesomeIcon icon={faThList}/></section><span>Lists</span></a>
                    <a href={`/home/profile/${user_id.user?user_id.user._id:''}`} ><section><FontAwesomeIcon icon={faUser}/></section><span>Profile</span></a>
                    <a href="/home/more"><section><FontAwesomeIcon icon={faInfoCircle}/></section><span>More</span></a>
                    <div style={{ marginTop: '12px',marginLeft: '28px',marginRight: '28px', position:'relative' }}><TwitterLargeButton width="100%" title="tweet"/></div>
                </nav>
                <div className="account-owner" onClick={() => setDisplayLogout(!displayLogout)}>
                <img
                    src={avatarPro} 
                    height='48px' 
                    width='48px'
                    style={{border: '1px solid #cccc',borderRadius:'50%'}}>
                </img>
                <div className='account-name' >
                    <span>User Name</span>
                    <span>@Hashtag for user</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                </div>
                    <div className="logout" onClick={handleLogOutClick} style={{ visibility: displayLogout?'visible':'hidden' }}><span>logOut @account name</span></div>
                </div>
            </div>            
        </>
    )
    
}

const mapStateToProps = (state) => ({

    user_id: state.user

})

export default withRouter(connect(mapStateToProps)(SideNavBar))