import React from 'react'
import { withRouter } from 'react-router'
import { publicFollowers, publicFollowing } from '../../apiClient/follow'
import FollowComponent from './follow-component'

class PublicFollow extends React.Component {

    constructor(){
        super()

        this.state = {
            follow: []
        }
    }

    async componentDidMount() {

        if (this.props.location.search.replace('?', '').split('=')[1] === 'follower') {
            
            const followers = await publicFollowers(this.props.match.params.id)
            await this.setState({follow: followers})
        } else {

            const following = await publicFollowing(this.props.match.params.id)

             await this.setState({follow: following}) 

        }

    }
    render(){

        return(
            <>
                <header style = {{
                    margin: '20px',
                    fontSize: '20px',
                    borderBottom: '4px solid #1991DA',
                    width: '100px',
                    fontWeight: 'bold'

                }}>
                    {this.props.location.search.replace('?', '').split('=')[1]+'s'}
                </header>
            <div style={{
                width: '78vw'
            }}>
             {
                 this.state.follow.map(user => <FollowComponent type = "notUser" {...user} />)

             }
             </div>
            </>
        )
    }

}

export default withRouter(PublicFollow)