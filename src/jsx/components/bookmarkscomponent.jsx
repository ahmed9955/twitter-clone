import React from 'react'
import { getBookmark } from '../../apiClient/bookmarks'
import { whoToFollow } from '../../apiClient/follow'
import { profile } from '../../apiClient/user'
import FollowComponent from './follow-component'
import Post from './post'

class BookmarkComponent extends React.Component {

    constructor(){
        super()

        this.state = {
            bookmarks: [],
            followers:[],
            current_user: {}
        }
    }

    async componentDidMount(){

        //fetch user profile
        const response = await profile(localStorage.token)
        this.setState({current_user: response})
        

        //fetch whotofollow
        const whotofollow = await whoToFollow()
        this.setState({followers: whotofollow.filter(user => !this.state.current_user.following.includes(user._id)) })


        const bookmarksposts = await  getBookmark()

        if(bookmarksposts){
            await this.setState({bookmarks: bookmarksposts})
            
            console.log(this.state.bookmarks)
        }


    }

    render(){

        return(
            <>
            <div style={{display: 'flex'}}>
                <div style={{flex:'2'}}>
                 {this.state.bookmarks.map(post => <Post creator = {post.user} created_at = {post.createdAt}  id={post._id} content={post.content} media={post.avatar} comments={post.comments}  likes={post.like}  profileName={post.user.profileName} avatar={post.user.avatar} id_user = {post.user._id} />)}
                </div>
                
                <div style={{flex:'1'}}>
                <div style = {{flex:'1',paddingLeft:'20px'}}>
                    <div style={{height:'354px',borderRadius:'20px',background:'#F7F9F9'}}>
                        <header style={{position:'relative',top:'10px',left:'25px',fontWeight:'bold',fontSize:'18px'}}>Who To Follow</header>
                        {this.state.followers.map( (user, index) => index < 4? <FollowComponent  {...user}  /> : '')}
                        <a href = "/home/whotofollow" style={{
                            textDecoration: 'none',
                            textAlign: 'start',
                            position: 'absolute',
                            top: '310px',
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
            </div>
            </>
        )
    }

}

export default BookmarkComponent