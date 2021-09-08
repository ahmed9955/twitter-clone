import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { profile } from '../../apiClient/user'
import { setTwitterButtonActive } from '../../redux/modal/action'
import { setNewUser } from '../../redux/user/action'

import '../../styles/pages/user-main-page.scss'
import CommentDetails from '../components/comment-details'
import Explore from '../components/explore'
import FollowPage from '../components/followPage'
import Messages from '../components/messages'
import Profile from '../components/profile'
import publicFollow from '../components/public-follow'
import SideNavBar from '../components/side-nav-bar'
import TweetsView from '../components/tweets-view'
import PostDetails from './post-details'
import WhoToFollow from './whotofollow-page'

class UserMainPage extends React.Component {

    async componentDidMount(){

        const token = localStorage.getItem('token') 
        
        const currentUser = await profile(token)
        
        this.props.setNewUser(currentUser)
        
        console.log(this.props.user)
        this.props.setTwitterButtonActive(false)
    }

render(){

    return(
        <>  
            <div style={{display:'flex',flexDirection:'row'}}>
                <div style={{ position:'fixed',zIndex:'20' }}>
                 <SideNavBar />
                </div>
                <div style={{ position:'absolute',left:'255px' }}>
                <Switch>
                    <Route exact path = '/home' component={TweetsView} />
                    <Route exact path = '/home/messages' component={Messages} />
                    <Route exact path = '/home/profile/:id' component={Profile} />
                    <Route path = '/home/explore' component={Explore}/>
                    <Route path = '/home/post_details' component={PostDetails}/>
                    <Route path = '/home/comment_details' component={CommentDetails}/>
                    <Route exact path='/home/followers' component={FollowPage}  />
                    <Route exact path='/home/following' component={FollowPage}  />
                    <Route exact path='/home/following/:id' component={publicFollow}  />
                    <Route exact path='/home/whotofollow' component={WhoToFollow}  />
                </Switch>
            </div> 
            </div>
        </>
    )
}

}

const mapStateToProps = state => ({
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    setNewUser: user => dispatch(setNewUser(user)),
    setTwitterButtonActive: active => dispatch(setTwitterButtonActive(active))
})


export default connect(mapStateToProps, mapDispatchToProps)(UserMainPage)