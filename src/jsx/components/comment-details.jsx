import React from 'react'
import { connect } from 'react-redux'
import { getCommentReplay } from '../../apiClient/replay'
import Comment from '../components/comment-component'

class CommentDetails extends React.Component {

    constructor(){
        super()
        this.state = {

            replays: []
        
        }
    }

    async componentDidMount() {

        const replay  = await getCommentReplay(this.props.postDetails.id)
        
        await this.setState({replays: replay})

        console.log(this.state.replays)

    }

    render(){
        const {content, media,profileName, _id, replays} = this.props

        return(
            <>  
                {
                    this.state.replays.map( ({_id ,content, comments, likes}) => 
                    
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}> 
                        <Comment _id ={_id} type = 'replay' content ={content} 

                        likes = {likes}
                        media = {this.props.postDetails.avatar} 
                        profileName = {this.props.postDetails.profileName} 
                        replays = {comments} 
                        />
                        </div> 
                        )
                }
            </>
        )
    }
}

const mapStateToProps = state => ({
    postDetails: state.modal.postDetails,
})


export default connect(mapStateToProps)(CommentDetails)