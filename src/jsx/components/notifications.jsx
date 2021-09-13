import React from 'react'
import { withRouter } from 'react-router'
import { whoToFollow } from '../../apiClient/follow'
import { notifications, notificationsNoted } from '../../apiClient/notifications'
import { avatar, getOneUser, profile } from '../../apiClient/user'
import '../../styles/components/notifications.scss'
import FollowComponent from './follow-component'



class Notifications extends React.Component {

    constructor() {
        super()
        this.state = {
            notifications: [],
            followers:[],
            account_owner: {},
            current_user:{},
            
        }

    }

    async componentDidMount() {

        const notification = await notifications()

        await this.setState({ notifications: notification })

        //fetch user profile
        const current_profile = await profile(localStorage.token)
        await this.setState({account_owner: current_profile})
        
        //fetch whotofollow
        const whotofollow = await whoToFollow()
        this.setState({followers: whotofollow.filter(user => !this.state.account_owner.following.includes(user._id))})

    }

    handleClick = (e, _id, postId, commentId) => {

        e.target.style.backgroundColor = 'white'
        e.target.style.boxShadow =  '0px 0px #FFFF'
        notificationsNoted(_id)

        if(postId){

            this.props.history.push(`/home/post_details/${postId}`)
            console.log('post')
        } else {

            this.props.history.push(`/home/comment_details/${commentId}`)
            console.log('comment')
        }
        
    }

    render() {

        return (
            <>
                <div style={{display: 'flex', width: '78vw'}}>
                    <div className="notifications">
                        <div style={{
                            padding: '20px',
                            fontSize: "35px",
                            fontWeight: 'bold',
                            fontFamily: 'sans-serif',
                        }}>Notifications</div>
                        {
                            this.state.notifications.map(({ sender, reciever, notification, _id, color }, index) => (
                                <div style={{ backgroundColor: color, marginBottom: '8px',flex: '1' , boxShadow: color === 'skyblue'?'5px 5px #888888':'5px 5px #FFFF'}} onClick={(e) => this.handleClick(e, _id, sender.postId, sender.commentId)}>
                                    <img src={sender.avatar} width='52px' height='52px' />
                                    <div onClick={(e) => e.stopPropagation()} style={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        width: 'fit-content',
                                        height: '100px',
                                        fontFamily: 'sans-serif',
                                        }}>
                                        <div>
                                            <strong>{sender.name}</strong>
                                            <span>{notification}</span>
                                        </div>
                                        <div style={{ 
                                            position: 'relative',
                                            top: '-20px', 
                                            left: '8px', 
                                            color: 'GrayText',
                                            fontFamily: 'sans-serif'
                                            }}>
                                            "{sender.content.substring(0, 50)}...."
                                        </div>
                                    </div>
                                </div>
                            )
                            )
                        }
                    </div>
                    <div style={{ flex: '1', paddingLeft: '20px' }}>

                        <div style={{ height: '354px', borderRadius: '20px', background: '#F7F9F9' }}>
                            <header style={{ position: 'relative', top: '10px', left: '25px', fontWeight: 'bold', fontSize: '18px' }}>Who To Follow</header>
                            {this.state.followers.map((user, index) => index < 4 ? <FollowComponent  {...user} /> : '')}
                            <a href="/home/whotofollow" style={{
                                textDecoration: 'none',
                                textAlign: 'start',
                                position: 'absolute',
                                top: '310px',
                                borderRadius: '20px',
                                fontSize: '15px',
                                color: '#1D9BF0',
                                fontFamily: 'sans-serif',
                                padding: '15px'
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
    }

}


export default withRouter(Notifications)