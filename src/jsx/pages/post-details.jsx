import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { whoToFollow } from '../../apiClient/follow'
import { Comments, getOnePost } from '../../apiClient/post'
import { profile } from '../../apiClient/user'
import { setPostDetails } from '../../redux/modal/action'
import Comment from '../components/comment-component'
import CommentModal from '../components/comment-modal'
import FollowComponent from '../components/follow-component'
import Post from '../components/post'

class PostDetails extends React.Component {

    constructor() {
        super()
        this.state = {

            postDetails: {},
            comments: [],
            followers:[],
            account_owner: {},
            showpost: false
        }
    }


    async componentDidMount() {

        //fetch user profile
        const current_profile = await profile(localStorage.token)
        this.setState({account_owner: current_profile})

         //fetch whotofollow
         const whotofollow = await whoToFollow()
         this.setState({followers: whotofollow.filter(user => !this.state.account_owner.following.includes(user._id)) })
        
        const post = await getOnePost(this.props.match.params.id)

        if (post){
        
            await this.setState({postDetails: post, showpost: true})
        }

        
        const commentsArray = await Comments(this.props.match.params.id)

        await this.setState({ comments: commentsArray })
        
    }



    render() {
        const {_id, like, createdAt,content, user, comments, avatar} = this.state.postDetails
        return (
            <>
                <div style={{ display: 'flex' }} >
                    <div style={{ display: 'flex', flexDirection: 'column', }}>

                        {
                            this.state.showpost &&

                            <Post 
                            id={_id} 
                            media={avatar} 
                            likes={like} 
                            profileName={user.profileName}
                            avatar={user.avatar}
                            comments={comments}
                            creator_id={user._id}
                            created_at = {createdAt}
                            content={content}
                            id_user = {user._id}
                            />
    
                        }
                    
                        {
                            this.state.comments.map(({ createdAt,post ,content, _id, like, replays, user }) => <Comment 
                            creator={user._id} 
                            type='comment' 
                            likes={like} 
                            replays={replays} 
                            media={user.avatar} 
                            profileName={this.state.postDetails.user} 
                            content={content} 
                            _id={_id} 
                            postId={post}
                            created_at={createdAt}
                            />)

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

                <CommentModal creator_id={this.state.postDetails.user} user_avatar={this.props.replayContent.user_avatar} profileName={this.props.replayContent.profileName} avatar={this.props.replayContent.avatar}  post_id={this.props.replayContent.post_id} post_content={this.props.replayContent.post_content} />

            </>
        )
    }
}

const mapStateToProps = (state) => ({
    postDetails: state.modal.postDetails,
    replayContent: state.modal.replayContent
})

const mapDispatchToProps = (dispath) => ({
    setPostDetails: details => dispath(setPostDetails(details))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))