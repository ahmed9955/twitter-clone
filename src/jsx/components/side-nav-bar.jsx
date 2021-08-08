import { faCriticalRole, faEvernote, faGgCircle, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAdjust, faBell, faBookmark, faBookReader, faCommentDots, faDotCircle, faEnvelope, faHashtag, faHome, faInfoCircle, faList, faNotesMedical, faSearch, faThList, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

import '../../styles/components/side-nav-bar.scss'
import TwitterLargeButton from './twitter-large-button'

const SideNavBar = () => {
    return(
        <>
            <div className="side-navbar-container">
                <nav className="nav-links">
                    <a style={{color:'#1DA1F2'}}>
                        <FontAwesomeIcon  icon={faTwitter}/>
                        </a>
                    <a><section><FontAwesomeIcon icon={faHome}/></section><span>Home</span></a>
                    <a><section><FontAwesomeIcon icon={faHashtag}/></section><span>Explore</span></a>
                    <a><section><FontAwesomeIcon icon={faBell}/></section><span>Notification</span></a>
                    <a><section><FontAwesomeIcon icon={faEnvelope}/></section><span>Messages</span></a>
                    <a><section><FontAwesomeIcon icon={faBookmark}/></section><span>Bookmarks</span></a>
                    <a><section><FontAwesomeIcon icon={faThList}/></section><span>Lists</span></a>
                    <a><section><FontAwesomeIcon icon={faUser}/></section><span>Profile</span></a>
                    <a><section><FontAwesomeIcon icon={faInfoCircle}/></section><span>More</span></a>
                    <div style={{ marginTop: '12px',marginLeft: '28px',marginRight: '28px' }}><TwitterLargeButton title="tweet"/></div>
                </nav>
                <div className="account-owner">
                <img
                    src="https://pbs.twimg.com/media/E7-UiXNXEAUVUTd?format=jpg&name=medium" 
                    height='48px' 
                    width='48px'
                    style={{border: '1px solid #cccc',borderRadius:'50%'}}>
                </img>
                <div className='account-name'>
                    <span>User Name</span>
                    <span>@Hashtag for user</span>
                </div>
                <div>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                </div>
                </div>
            </div>            
        </>
    )
    
}
export default SideNavBar