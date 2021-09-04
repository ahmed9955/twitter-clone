import React, { useEffect, useState } from 'react'
import {TextField, Button} from '@material-ui/core'
import io from 'socket.io-client'
const socket = io('http://localhost:2000')

const SocketIo = () => {

    const [state, setState] = useState({message: '', name: ''})
    const [chat, setChat] = useState([])

    useEffect(() => {
        socket.on('message', ({ name, message}) => {
            setChat([...this.state.chat, {name, message}])
        })
    })

    const handleChange =  (e) => {
        
        const {name, value} = e.target
         setState({...state,[name]: value})

         console.log(state)
    }

    const handleSubmit = async () => {

        const  {name, message} = state
        
        socket.emit('message', {name, message})


    }

    return(
        <>
        <div className='card'>
          
                <TextField
                    name = "name"
                    value = {state.name}
                    onChange = {(e) => handleChange(e)}
                    label= "Name"
                />
                <TextField
                    name = "message"
                    value = {state.message}
                    onChange = {(e) => handleChange(e)}
                    label= "Message"
                />
                <Button onClick={handleSubmit}>Send</Button>

        </div>
        <div>
            {chat.map((message, id) => {
                return(
                   <div key={id}>
                       <span>{message.name}</span>:
                       <span>{message.message}</span>
                   </div>
                )
            })}
        </div>
        </>
    )
}

export default SocketIo