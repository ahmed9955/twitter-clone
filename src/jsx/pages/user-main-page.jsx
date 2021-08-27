import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'
import { profile } from '../../apiClient/user'
import { setTwitterButtonActive } from '../../redux/modal/action'
import { setNewUser } from '../../redux/user/action'

import '../../styles/pages/user-main-page.scss'
import FollowPage from '../components/followPage'
import Profile from '../components/profile'
import SideNavBar from '../components/side-nav-bar'
import TweetsView from '../components/tweets-view'
import PostDetails from './post-details'

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
                <div style={{ position:'absolute',left:'280px' }}>
                <Switch>
                    <Route exact path = '/home' component={TweetsView} />
                    <Route path = '/home/profile' component={Profile} />
                    <Route path = '/home/post_details' component={PostDetails}/>
                    <Route exact path='/home/followers' component={FollowPage}  />
                    <Route exact path='/home/following' component={FollowPage}  />
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