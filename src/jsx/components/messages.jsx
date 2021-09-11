import React from 'react'
import '../../styles/components/messages.scss'
import { SendRounded, FaceRounded, EmojiFlags, EmojiEmotionsSharp } from '@material-ui/icons'
import io from 'socket.io-client'
import { followers } from '../../apiClient/follow'
import { connect } from 'react-redux'
import { profile } from '../../apiClient/user'
import LeftChat from './left-chat-message'
import RightChat from './right-chat-message'
import { chat, chatShowMessage } from '../../apiClient/chat'
import modal from './modal'
import { setFontWeightSeen } from '../../redux/modal/action'
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';


const socket = io('http://localhost:2000')


class Messages extends React.Component {

    
    chatContainer = React.createRef();

    constructor(){
        super()
        this.state = {
            sentContent: {
                sender:'',
                reciever:'',
                message: '',
                color: 'black',
                fontWeight: 'bold'
            },
            chat: [],
            textmessage:'',
            clients: [],
            current_user:'',
            lastmessage:'',
            allchats: [],
            colorSeen: '#636363',
            fontWeightSeen: 'normal',
            displayEmoj: false

        }
    }

    async componentDidMount(){

        
        const user = await profile(localStorage.token)
        await this.setState({current_user: user})


        await this.setState({sentContent: {
            ...this.state.sentContent, 
            sender: {
                id: this.state.current_user._id,
                name: this.state.current_user.profileName,
                avatar: this.state.current_user.avatar
            } 
        }})

        const follwers = await followers()

        await this.setState({ clients: follwers })

        
        socket.on('message', ({ sender, reciever, message, color, fontWeight}) => {
                
            this.setState({chat:[...this.state.chat, {message, sender,reciever,fontWeight, color}]}, () => this.scrollToMyRef())

        })

        const chats = await chat()

        this.setState({allchats: chats})


    }


    handleLastMessage = (content) => {
  
        if(this.state.allchats){
             const messages = this.state.allchats.filter(chat => ((
                 chat.sender.id === this.state.current_user._id || chat.sender.id === content._id )  
            
                 ) && (chat.reciever.id === this.state.current_user._id || chat.reciever.id === content._id) )


                const obj = messages[messages.length-1]
                
                if (obj){
                
                 return obj
                }
       
        }
}

    handleStoreReciever = async (id,name,avatar) => {

        
        await this.setState({sentContent: {
            ...this.state.sentContent, 
            reciever: {id,name,avatar} 
        }})
        
        console.log(this.state.sentContent)

        const chats = await chat()

        if (chats){

            let chatArray = []
            
            const chat = chats.map(item => {
                delete item._id 
                return item 
            })

            for(let c of chat){

                if (                     
                    c.sender.id === this.state.current_user._id  && 
                    c.reciever.id === this.state.sentContent.reciever.id || c.sender.id === this.state.sentContent.reciever.id ) {
                    
                    chatArray.push(c)
                   
                                        
            }
            }
        
            await this.setState({chat: chatArray}, ()=> this.scrollToMyRef())

            await chatShowMessage(id)
            
    }
}



    handleSend = async (e) => {
        e.stopPropagation()


        if (this.state.textmessage === '') return
        this.setState({displayEmoj: false})

        const {sender,reciever , message, fontWeight, color} = this.state.sentContent

        socket.emit('message', {sender, reciever, message, fontWeight, color })

        this.setState({textmessage: ''})

        
    }


    handleChange = (e) => {
        const {name, value} = e.target
        
        this.setState( {textmessage: value} )
        this.setState({sentContent:{...this.state.sentContent,[name]: value}})


    }
    

    handleEmojClick = (e) => {
        e.stopPropagation()

        this.setState({displayEmoj: !this.state.displayEmoj})
    }

    onEmojiClick = async (event, emojiObject) => {
        
         this.setState( {textmessage: this.state.textmessage+emojiObject.emoji} )
         await this.setState({sentContent: {...this.state.sentContent, message:this.state.textmessage+emojiObject.emoji}})

    }

    scrollToMyRef = () => {
        const scroll =
          this.chatContainer.current.scrollHeight -
          this.chatContainer.current.clientHeight;
          this.chatContainer.current.scrollTo(0, scroll);
      };


    
    render(){
        return(
            <>
            <div className="chat-container">
            {this.state.sentContent.reciever !== ''? 
                <div className="messages-view">
                    
                    <div className="shared-messages">
                    
                        <div className="reciever-account">
                            <img src = {this.state.sentContent.reciever.avatar} />
                            <span style={{fontWeight: this.state.fontWeightSeen, color: this.state.colorSeen,fontFamily: 'monospace'}}>{this.state.sentContent.reciever.name}</span>
                        </div>
                        
                        <div ref={this.chatContainer} className="message-history" >
                           
                            {this.state.chat.map((content,key)=> (
                                <>
                                    
                                    { content.reciever.id === this.state.current_user._id &&
                                        <LeftChat   content={content}/>
                                    }
                                    { content.sender.id === this.state.current_user._id &&
                                        <RightChat   content={content}/>
                                    }

                                </>
                            ))                            
                            }
                           
                        </div>
                    </div>
                    <div className="send-message">

                        <div className="write-text-message">
                           <input autocomplete="off" value={this.state.textmessage} placeholder="Type a messsage" onChange={this.handleChange} name="message" />
                           <span onClick={this.handleSend} >
                            <span onClick={this.handleEmojClick}>
                                <EmojiEmotionsSharp />
                            </span>
                            <SendRounded />
                           </span> 
                        </div>
                
                    </div>
                </div>:<div className="messages-view"></div>}
                <div className="users-view">
                    <div style={{fontSize:'25px', padding: '20px', borderBottom:'1px solid #cccc', fontWeight:'bold'}} >Chat</div>
                    {this.state.clients.map( (client, key) => (
                        <div style={{
                            display:'flex',
                        }} key={key} className="reciever-account" onClick={ () => this.handleStoreReciever(client._id, client.profileName, client.avatar)}>
                        <img src={client.avatar} />
                        <div>
                            <div style={{                            
                            fontFamily:'monospace',
                            }}>{client.profileName}</div>
                            <div style={{color: this.state.colorSeen, fontWeight: this.props.fontWeightSeen ,fontSize: '16px'}}>{ this.handleLastMessage(client)? this.handleLastMessage(client).message.slice(0,10)+'....':'' }</div>
                        </div>
                    </div>
                    )) 
                    }
                </div>  
            
            </div>
            <div style={{
                borderRadius: '0',
                position: 'absolute',
                top: '280px',
                left: '300px',
                textAlign: 'center',
                zIndex:'211',
                display: this.state.displayEmoj?'block':'none'
                }}>
                
                <Picker  onEmojiClick={this.onEmojiClick} skinTone={SKIN_TONE_MEDIUM_DARK}/>
            
            </div>

            </>

        )
    }
    
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    fontWeightSeen: state.modal.fontWeightSeen
})

const mapDispatchToProps = (dispatch) => ({
    setFontWeightSeen: seen => dispatch(setFontWeightSeen(seen))
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)