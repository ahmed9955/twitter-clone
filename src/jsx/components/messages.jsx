import React from 'react'
import '../../styles/components/messages.scss'
import { SendRounded } from '@material-ui/icons'
import io from 'socket.io-client'
import { followers } from '../../apiClient/follow'
import { connect } from 'react-redux'
import { profile } from '../../apiClient/user'
import LeftChat from './left-chat-message'
import RightChat from './right-chat-message'
import { chat } from '../../apiClient/chat'

const socket = io('http://localhost:2000')


class Messages extends React.Component {

    
    chatContainer = React.createRef();

    constructor(){
        super()
        this.state = {
            sentContent: {
                sender:'',
                reciever:'',
                message: ''
            },
            chat: [],
            textmessage:'',
            clients: [],
            current_user:'',
            lastmessage:'',
            allchats: []
        }
    }

    async componentDidMount(){

        
        const user = await profile(localStorage.token)
        await this.setState({current_user: user})

        console.log('current user', this.state.current_user)

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

        console.log(this.state.clients)
        
        socket.on('message', ({ sender, reciever, message}) => {
            
            this.setState({chat:[...this.state.chat, {message, sender,reciever}]}, () => this.scrollToMyRef())
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
                    
                    return obj.message
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

    }
    }



    handleSend = async (e) => {
        e.stopPropagation()


        const {sender,reciever , message} = this.state.sentContent

        socket.emit('message', {sender, reciever, message})

        this.setState({textmessage: ''})

    
    }


    handleChange = (e) => {
        const {name, value} = e.target
        
        this.setState({textmessage: value})
        this.setState({sentContent:{...this.state.sentContent,[name]: value}})

        console.log(this.state.sentContent)

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
                            <span>{this.state.sentContent.reciever.name}</span>
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
                            <SendRounded  />
                           </span> 
                        </div>
                        
                    </div>
                </div>:<div className="messages-view"></div>}
                <div className="users-view">
                    <div style={{fontSize:'25px', padding: '20px', borderBottom:'1px solid #cccc', fontWeight:'bold'}} >Chat</div>
                    {this.state.clients.map( (client, key) => (
                        <div style={{
                            display:'flex'
                        }} key={key} className="reciever-account" onClick={ () => this.handleStoreReciever(client._id, client.profileName, client.avatar)}>
                        <img src={client.avatar} />
                        <div>
                            <div>{client.profileName}</div>
                            <div>{ this.handleLastMessage(client)? this.handleLastMessage(client).slice(0,10)+'....':'' }</div>
                        </div>
                    </div>
                    )) 
                    }
                </div>  
            
            </div>
            </>

        )
    }
    
}

const mapStateToProps = (state) => ({
    user: state.user.user
})

export default connect(mapStateToProps)(Messages)