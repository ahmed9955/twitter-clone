import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router'
import { whoToFollow } from '../../apiClient/follow'
import { getUserPosts } from '../../apiClient/post'
import { avatar, getOneUser, profile, uploadAvatar, uploadPortrait } from '../../apiClient/user'
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
            followers:[],
            account_owner: {},
            portrait_photo: ''
        }
    }

    async componentDidMount() {
     
        //fetch user profile

        const current_profile = await profile(localStorage.token)
        this.setState({account_owner: current_profile})

        const public_profile = await getOneUser(this.props.match.params.id)                
        this.setState({current_user: public_profile})

        //fetch whotofollow
        const whotofollow = await whoToFollow()
        this.setState({followers: whotofollow.filter(user => !this.state.account_owner.following.includes(user._id)) })

         this.setState({avatarProfile: this.state.current_user?this.state.current_user.avatar: 'https://pbs.twimg.com/profile_images/1429509461320818689/kAYGSvpx_400x400.png'})
         this.setState({portrait_photo: this.state.current_user?this.state.current_user.portrait: 'https://pbs.twimg.com/profile_images/1429509461320818689/kAYGSvpx_400x400.png'})
        
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

    handlePortrait =  async(e) => {

        const portrait = await uploadPortrait(e.target.files[0], e.target.files[0].name)
        console.log(portrait, 'portrait')

        let reader = new FileReader()

        reader.readAsDataURL(e.target.files[0])
            
        reader.onload =(e) => {
            this.setState({portrait_photo: e.target.result})
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
                        <input id="upload_portrait" onChange={this.handlePortrait} style={{display: 'none'}} type='file' accept='image/*' />                    
                        <label style={{cursor:'pointer', width: '100%' , height: '100%'}} for='upload_portrait'>
                            <img src = {this.state.portrait_photo} style={{display: this.state.portrait_photo?'block':'none'}} width="100%" height="100%"  />
                        </label>
                    </div>
                    { this.state.current_user._id === this.state.account_owner._id &&
                    
                    <div className='edit-profile'>Edit Profile</div>
                    }
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

                                <a href={ 
                                    this.state.current_user._id === this.state.account_owner._id? 
                                '/home/following': `/home/following/${this.props.match.params.id}?follow=following`
                            } ><span>{this.state.current_user.following?this.state.current_user.following.length:''}</span> Following</a>
                                <a href={
                                    this.state.current_user._id === this.state.account_owner._id?
                                    '/home/followers': `/home/following/${this.props.match.params.id}?follow=follower` } ><span>{this.state.current_user.followers?this.state.current_user.followers.length:''}</span> Followers</a>
                            </div> 
                        </div>
                    </div>
                </div>
                <div  className="tweets-nav-bar">
                    <a href={`/home/profile/${this.state.current_user._id}`} className={localStorage.getItem('tweets')} onClick={() => {
                        localStorage.setItem('tweets','nav-focus')
                        localStorage.setItem('tweetsAndReplays','')
                        localStorage.setItem('media','')
                        localStorage.setItem('likes','')
                    }}>Tweets</a>

                    <a href={`/home/profile/${this.state.current_user._id}/media`} className={localStorage.media} onClick={() => {
                        localStorage.setItem('tweets','')
                        localStorage.setItem('tweetsAndReplays','')
                        localStorage.setItem('media','nav-focus')
                        localStorage.setItem('likes','')
                    }} >Media</a>
                    <a href={`/home/profile/${this.state.current_user._id}/withLikes`} className={localStorage.likes} onClick={() => {
                             localStorage.setItem('tweets','')
                             localStorage.setItem('tweetsAndReplays','')
                             localStorage.setItem('media','')
                             localStorage.setItem('likes','nav-focus')
                    }} >Likes</a>

                </div>  
                <div style={{ height:'440px' }}>

                    <Switch>
                        <Route  exact path="/home/profile/:id" component={Tweets} />
                        <Route  exact path="/home/profile/:id/withReplays" component={TweetsAndReplies} />
                        <Route  exact path="/home/profile/:id/media" component={Media} />
                        <Route  exact path="/home/profile/:id/withLikes" component={Likes} />
              
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
                            position: 'absolute',
                            top: '310px',
                            borderRadius: '20px',
                            fontSize: '15px',
                            color: '#1D9BF0',
                            fontFamily: 'sans-serif',
                            padding:'15px'
                        }}>
                            show more
                        </a>
                    </div>
                    <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '350px',
                    
            }}>

                    <a className="policy">Terms of Service</a>
                    <a className="policy">Privacy Policy</a>
                    <a className="policy">Cookie Policy</a>
                    <a className="policy">Ads info</a>
                    <span className="policy-span">© 2021 Twitter, Inc.</span>

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