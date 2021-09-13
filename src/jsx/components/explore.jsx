import React from 'react'
import { connect } from 'react-redux'
import { whoToFollow } from '../../apiClient/follow'
import { newFeeds, newFeedsExplore } from '../../apiClient/post'
import { profile } from '../../apiClient/user'
import CommentModal from './comment-modal'
import CreatePost from './create-post'
import FollowComponent from './follow-component'
import Post from './post'

class Explore extends React.Component {

    constructor(){
        super()

        this.state = {
            newFeeds: [],
            followers:[],
            current_user:{},


        }

    }

    async componentDidMount(){

        //fetch user profile
        const response = await profile(localStorage.token)
        this.setState({current_user: response})
        

        //fetch whotofollow
        const whotofollow = await whoToFollow()
        this.setState({followers: whotofollow.filter(user => !this.state.current_user.following.includes(user._id)) })
        

        const newfeed = await newFeedsExplore()

        await this.setState({newFeeds: newfeed})

        console.log('feeds',this.state.newFeeds)
    
    }


    render(){
        return(
            <>
            <div style={{display:'flex', flexDirection: 'row',width:'78vw', justifyContent: 'space-between'}}>
            <div className='tweets-container' style={{flex: '2'}}>
                <CreatePost />
                
                {this.state.newFeeds.map(post => <Post 
                creator = {post.user}  
                id={post._id} 
                content={post.content} 
                media={post.avatar} 
                created_at={post.createdAt} 
                comments={post.comments} 
                likes={post.like}  
                profileName={post.user.profileName} 
                avatar={post.user.avatar} 
                id_user = {post.user._id} />)}
                
            </div>

            <CommentModal creator_id = {this.props.replayContent.creator_id} user_avatar = {this.props.replayContent.user_avatar} profileName = {this.props.replayContent.profileName} avatar = {this.props.replayContent.avatar}  post_id = {this.props.replayContent.post_id} post_content={this.props.replayContent.post_content} />   

            <div style = {{flex:'1',paddingLeft:'20px'}}>
                    <div style={{height:'354px',borderRadius:'20px',background:'#F7F9F9'}}>
                        <header style={{position:'relative',top:'10px',left:'25px',fontWeight:'bold',fontSize:'18px'}}>Who To Follow</header>
                        {this.state.followers.map( (user, index) => index < 4? <FollowComponent  {...user}  /> : '')}
                        <a href = "/home/whotofollow" style={{
                            textDecoration: 'none',
                            textAlign: 'start',
                            position: 'absolute',
                            top: '320px',
                            borderRadius: '20px',
                            fontSize: '15px',
                            color: '#1D9BF0',
                            fontFamily: 'sans-serif',
                            padding:'15px'
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

const mapStateToProps = (state) => ({
    replayContent: state.modal.replayContent
})

export default connect(mapStateToProps)(Explore)