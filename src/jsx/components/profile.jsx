import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router'
import { whoToFollow } from '../../apiClient/follow'
import { getUserPosts } from '../../apiClient/post'
import { avatar, profile, uploadAvatar } from '../../apiClient/user'
import { setLikes, setMedia } from '../../redux/user/action'
import '../../styles/components/profile.scss'
import FollowComponent from './follow-component'
import Likes from './likes'
import Media from './media'
import Tweets from './tweets'
import TweetsAndReplies from './tweets&replies'

class Profile extends React.Component {

    constructor(){
        super()
        this.state = {
            avatarProfile:'',
            userPosts:[],
            current_user:{},
            followers:[]
        }
    }

    async componentDidMount() {
     
        //fetch user profile
        const response = await profile(localStorage.token)
        this.setState({current_user: response})

        //fetch whotofollow
        const whotofollow = await whoToFollow()
        this.setState({followers: whotofollow.filter(user => !this.state.current_user.following.includes(user._id)) })

        //fetch avatar profile
        const result = await avatar(localStorage.token)
        if (result){
            return this.setState({avatarProfile: result})
        } 
        this.setState({ avatarProfile:'https://pbs.twimg.com/profile_images/1429509461320818689/kAYGSvpx_400x400.png'})
        
    }

    handleAvatar = async (e) => {
        const avatar = await uploadAvatar(e.target.files[0],e.target.files[0].name,localStorage.token)
        console.log(avatar.avatar)
        let reader = new FileReader()

        reader.readAsDataURL(e.target.files[0])    
        reader.onload =(e) => {
            this.setState({avatarProfile: e.target.result})
        }
    }
render() {
    return(
        <>
        <div style={{display:'flex',flexDirection:'row',width:'78vw'}}>
            <div className='profile-container' style={{flex:'2'}}>
                <div className='profile-navbar'>

                </div>
                <div className='profile-details'>
                    <div className='portrait'>
                        <img style={{visibility:'hidden'}} width="100%" height="100%" src = "" />
                    </div>
                    <div className='edit-profile'>Edit Profile</div>
                    <div className="profile-picture-rounded">
                        <input id="upload_avatar" onChange={this.handleAvatar} style={{display: 'none'}} type='file' accept='image/*' />
                        <label style={{cursor:'pointer'}} for='upload_avatar'>
                            <img src={this.state.avatarProfile} style={{borderRadius:'50%', border: '5px solid #ffff'}} width='130px' height='130px' />
                        </label>
                        <div style={{textAlign:'start'}}>
                            <div>{this.state.current_user.profileName}</div>
                            <div>@{this.state.current_user.profileName}</div>
                            <span> <FontAwesomeIcon icon={faCalendar}  /> joined {this.state.current_user.createdAt?this.state.current_user.createdAt.split('-')[1]:''} {this.state.current_user.createdAt?this.state.current_user.createdAt.split('-')[0]:''}  </span>
                            <div className="following">

                                <a href='/home/following' ><span>{this.state.current_user.following?this.state.current_user.following.length:''}</span> Following</a>
                                <a href='/home/followers' ><span>{this.state.current_user.followers?this.state.current_user.followers.length:''}</span> Followers</a>
                            
                            </div> 
                        </div>
                    </div>
                </div>
                <div  className="tweets-nav-bar">
                    <a href="/home/profile" className={localStorage.getItem('tweets')} onClick={() => {
                        localStorage.setItem('tweets','nav-focus')
                        localStorage.setItem('tweetsAndReplays','')
                        localStorage.setItem('media','')
                        localStorage.setItem('likes','')
                    }}>Tweets</a>
                    <a href="/home/profile/withReplays" className={localStorage.tweetsAndReplays} onClick={() => {
                        localStorage.setItem('tweets','')
                        localStorage.setItem('tweetsAndReplays','nav-focus')
                        localStorage.setItem('media','')
                        localStorage.setItem('likes','')
                    }} >Tweets & replies</a>
                    <a href="/home/profile/media" className={localStorage.media} onClick={() => {
                        localStorage.setItem('tweets','')
                        localStorage.setItem('tweetsAndReplays','')
                        localStorage.setItem('media','nav-focus')
                        localStorage.setItem('likes','')
                    }} >Media</a>
                    <a href="/home/profile/withLikes" className={localStorage.likes} onClick={() => {
                             localStorage.setItem('tweets','')
                             localStorage.setItem('tweetsAndReplays','')
                             localStorage.setItem('media','')
                             localStorage.setItem('likes','nav-focus')
                    }} >Likes</a>

                </div>  
                <div style={{ height:'440px' }}>

                    <Switch>
                        <Route exact path="/home/profile" component={Tweets} />
                        <Route path="/home/profile/withReplays" component={TweetsAndReplies} />
                        <Route path="/home/profile/media" component={Media} />
                        <Route path="/home/profile/withLikes" component={Likes} />
              
                    </Switch>
                </div>
            </div>
   
            <div style = {{flex:'1',paddingLeft:'20px'}}>

                    <div style={{height:'354px',borderRadius:'20px',background:'#F7F9F9'}}>
                        <header style={{position:'relative',top:'10px',left:'25px',fontWeight:'bold',fontSize:'18px'}}>Who To Follow</header>
                        {this.state.followers.map((user, index) => index <4? <FollowComponent  {...user}  />: '')}
                        <a href = "/home/whotofollow" style={{
                            textDecoration: 'none',
                            textAlign: 'start',
                            position: 'relative',
                            top: '75px',
                            borderRadius: '20px',
                            fontSize: '15px',
                            color: '#1D9BF0',
                            fontFamily: 'sans-serif',
                            padding:'15px'
                        }}>
                            show more
                        </a>
                    </div>
                    
            </div>
        </div>    
        </>
    )
}}

const mapStateToProps = (state) => ({
    user: state.user
})

export default withRouter(connect(mapStateToProps)(Profile))