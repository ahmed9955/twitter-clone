import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { profile } from '../../apiClient/user'
import { setTwitterButtonActive } from '../../redux/modal/action'
import { setNewUser } from '../../redux/user/action'

import '../../styles/pages/user-main-page.scss'
import SideNavBar from '../components/side-nav-bar'
import TweetsView from '../components/tweets-view'

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
                <SideNavBar />
                <TweetsView/> 
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