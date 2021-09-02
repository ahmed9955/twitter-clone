import React from 'react'
import { connect } from 'react-redux'
import { following } from '../../apiClient/follow'
import FollowComponent from './follow-component'

class FollowingTab extends React.Component {

    constructor(){
        super()
        this.state = {
            following: []
        }
    }

    async componentDidMount(){
    
       const followings = await following()
       await this.setState({ following: followings})
       console.log(this.state.following)
       
    }


render(){
    return(
        <>
            <div>
                {
                    this.state.following.map(user => <FollowComponent {...user} followType = "following" />)
                }
                
            </div>
        </>
    )
}}

const mapStateToProps = (state) => ({
    user: state.user.user
})


export default connect(mapStateToProps)(FollowingTab)