import { faCriticalRole, faEvernote, faGgCircle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAdjust, faBell, faBookmark, faBookReader, faCommentDots, faDotCircle, faEnvelope, faHashtag, faHome, faInfoCircle, faList, faNotesMedical, faSearch, faThList, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { avatar, logOut, URL } from '../../apiClient/user'
import io from 'socket.io-client'
import '../../styles/components/side-nav-bar.scss'
import TwitterLargeButton from './twitter-large-button'
import { getnotificationsCount } from '../../apiClient/notifications'
import { setTweetModalVisibility } from '../../redux/modal/action'
import TweetModal from './tweet-modal'

const socket = io('http://localhost:2000')


const SideNavBar = ({history, user_id, setTweetModalVisibility}) => {

    const [URL,setURL] = useState('http://localhost:3000/')
    
    const [avatarPro, setAvatarProfile] = useState('')
    const [notificationsCount, setNotificationsCount] = useState(0)

    const [displayLogout, setDisplayLogout] = useState(false)

    useEffect(async () => {
        
        const avatarProfile = await  avatar(localStorage.token)

        if (avatarProfile){
            setAvatarProfile(avatarProfile) 
            
        } else {
            setAvatarProfile('https://pbs.twimg.com/profile_images/1429509461320818689/kAYGSvpx_400x400.png')
        }

        const notifCount = await getnotificationsCount()
        setNotificationsCount(notifCount)

        socket.on('notificationsCount', (count) => {

            setNotificationsCount(count)
        })

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

   const handleTweetModalClick = () => {
    setTweetModalVisibility(true)
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
                    <a href="/home/notification"><section>
                        {notificationsCount !== 0 && <div style={{
                        position: 'absolute',
                        backgroundColor: 'red',
                        width: '20px',
                        height: '20px',
                        textAlign:'center',
                        borderRadius: '50%',
                        color: 'white',
                        fontSize: '12px'
                    }}>{notificationsCount}
                    </div>}<FontAwesomeIcon icon={faBell}/></section><span>Notification</span></a>
                    <a href="/home/messages"><section><FontAwesomeIcon icon={faEnvelope}/></section><span>Messages</span></a>
                    <a href="/home/bookmarks"><section><FontAwesomeIcon icon={faBookmark}/></section><span>Bookmarks</span></a>
                    <a href={`/home/profile/${user_id.user?user_id.user._id:''}`} ><section><FontAwesomeIcon icon={faUser}/></section><span>Profile</span></a>
                    <a href="/home/more"><section><FontAwesomeIcon icon={faInfoCircle}/></section><span>More</span></a>
                    <div style={{ marginTop: '12px',marginLeft: '28px',marginRight: '28px', position:'relative' }}><TwitterLargeButton handleClick={handleTweetModalClick} width="100%" title="tweet"/></div>
                </nav>
                <div className="account-owner" onClick={() => setDisplayLogout(!displayLogout)}>
                <img
                    src={avatarPro} 
                    height='48px' 
                    width='48px'
                    style={{border: '1px solid #cccc',borderRadius:'50%'}}>
                </img>
                <div className='account-name' >
                    <span>{user_id.user?user_id.user.profileName:''}</span>
                    <span>@{user_id.user?user_id.user.profileName:''}</span>
                </div>
                <div style={{marginRight: '10px'}}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                </div>
                    <div className="logout" 
                        onClick={handleLogOutClick} 
                        style={{ visibility: displayLogout?'visible':'hidden' }}>
                        <span>logOut @{user_id.user?user_id.user.profileName:''}</span>
                    </div>
                </div>
            </div>            
            <TweetModal />
        </>
    )
    
}

const mapStateToProps = (state) => ({

    user_id: state.user

})

const mapDispatchToProps = dispatch => ({

    setTweetModalVisibility: display => dispatch(setTweetModalVisibility(display))

})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideNavBar))