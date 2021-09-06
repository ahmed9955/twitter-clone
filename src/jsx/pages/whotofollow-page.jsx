import React from 'react'
import { whoToFollow } from '../../apiClient/follow'
import { profile } from '../../apiClient/user'
import FollowComponent from '../components/follow-component'

class WhoToFollow extends React.Component {

    constructor(){
        super()
        this.state = {

            current_user:'',
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
    }

render(){
        return(
            <>
                <div style={{ width:'78vw'}}>
                        <header style={{position:'relative',top:'10px',left:'25px',fontWeight:'bold',fontSize:'18px'}}>Who To Follow</header>
                        {this.state.followers.map( user => <FollowComponent  {...user}  />)}
                </div>
            </>
        )
    }

}

export default WhoToFollow