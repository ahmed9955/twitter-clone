import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { whoToFollow } from '../../apiClient/follow'
import { getCommentReplay } from '../../apiClient/replay'
import { profile } from '../../apiClient/user'
import Comment from '../components/comment-component'
import FollowComponent from './follow-component'

class CommentDetails extends React.Component {

    constructor() {
        super()
        this.state = {

            replays: [],
            followers: [],
            account_owner: {}

        }
    }

    async componentDidMount() {

        //fetch user profile
        const current_profile = await profile(localStorage.token)
        this.setState({ account_owner: current_profile })

        //fetch whotofollow
        const whotofollow = await whoToFollow()
        this.setState({ followers: whotofollow.filter(user => !this.state.account_owner.following.includes(user._id)) })


        console.log(this.props.match.params.id)
        const replay = await getCommentReplay(this.props.match.params.id)

        if(replay){
            await this.setState({ replays: replay })

            console.log(this.state.replays, 'dddddddd')
    
        }

    }

    render() {
        const { content, media, profileName, _id, replays } = this.props

        return (
            <>
                <div style={{ fontSize: '30px', padding: '10px', fontWeight: 'bold'}}>Replies</div>
                <div style={{ display: 'flex', width: '78vw' }}>

                <div style={{flex: '2'}}>
                    {
          
                            this.state.replays.map( ({createdAt,_id, content, comments, likes, comment, user}) =>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                                <Comment  _id={_id} type='replay' content={content}

                                    likes={likes}
                                    media={user.avatar}
                                    profileName={user}
                                    replays={comments}
                                    commentId = {comment}
                                    created_at = {createdAt}
                                    
                                />
                            </div>

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

const mapStateToProps = state => ({
    postDetails: state.modal.postDetails,
})


export default withRouter(connect(mapStateToProps)(CommentDetails))