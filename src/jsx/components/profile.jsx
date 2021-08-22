import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Route, Switch } from 'react-router'
import '../../styles/components/profile.scss'
import Likes from './likes'
import Media from './media'
import Tweets from './tweets'
import TweetsAndReplies from './tweets&replies'

const Profile = () => {

    return(
        <>
            <div className='profile-container'>
                <div className='profile-navbar'>

                </div>
                <div className='profile-details'>
                    <div className='portrait'>
                        <img style={{visibility:'hidden'}} width="100%" height="100%" src = "" />
                    </div>
                    <div className='edit-profile'>Edit Profile</div>
                    <div className="profile-picture-rounded">
                        <img src="https://pbs.twimg.com/profile_images/1429509461320818689/kAYGSvpx_400x400.png" style={{borderRadius:'50%', border: '5px solid #ffff'}} width='130px' height='130px' />
                        <div style={{textAlign:'start'}}>
                            <div>User Name</div>
                            <div>@username</div>
                            <span> <FontAwesomeIcon icon={faCalendar}  /> joined july 2011</span>
                            <div className="following">
                                <a href="#"><span>100</span> Following</a>
                                <a href="#"><span>25</span> Followers</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tweets-nav-bar">
                    <a href="/home/profile">Tweets</a>
                    <a href="/home/profile/withReplays" >Tweets & replies</a>
                    <a href="/home/profile/media" >Media</a>
                    <a href="/home/profile/withLikes" >Likes</a>
                    <Switch>
                        <Route exact path="/home/profile" component = {Tweets} />
                        <Route path="/home/profile/withReplays" component={TweetsAndReplies} />
                        <Route path="/home/profile/media" component={Media} />
                        <Route path="/home/profile/withLikes" component={Likes} />
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default Profile