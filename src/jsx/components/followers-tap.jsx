import { render } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { followers, requests } from '../../apiClient/follow'
import FollowComponent from './follow-component'

class FollowersTab extends React.Component {

    constructor(){
        super()
        this.state = {
            requests: [],
            followers:[]
        }
    }

   async componentDidMount(){

       const request = await requests()
       const follower = await followers()

       await this.setState({requests: request })
       console.log('request',this.state.requests)
      
       await this.setState({followers: follower})
       console.log('followers',this.state.followers)
    }

render(){
    return(
        <>
            <div>
                {
                    this.state.requests.map(user => <FollowComponent {...user} followType="followers"/>)
                    
                }

                {
                    this.state.followers.map(user => <FollowComponent {...user} followType="following"/>)
                }

            </div>
        </>
    )
}
}

const mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps)(FollowersTab)