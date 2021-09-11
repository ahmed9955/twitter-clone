import React from 'react'
import { notifications, notificationsNoted } from '../../apiClient/notifications'
import { avatar } from '../../apiClient/user'
import '../../styles/components/notifications.scss'


class Notifications extends React.Component {

    constructor(){
        super()
        this.state = {
            notifications: []
        }

    }

    async componentDidMount() {


        const notification = await notifications()

        await this.setState({notifications: notification})

    }

    handleClick = (e,_id) => {

        e.target.style.backgroundColor = 'white'
        
        notificationsNoted(_id)
    }

    render(){

        return(
            <>
                <div className = "notifications">
                    <div style={{
                        padding:'20px', 
                        fontSize:"35px",
                        fontWeight: 'bold',
                        fontFamily:'sans-serif',
                        }}>Notifications</div>
                    {
                        this.state.notifications.map( ({sender, reciever, notification, _id, color}, index) => (
                            <div style = {{backgroundColor: color ,marginBottom: '8px'}} onClick={(e) => this.handleClick(e,_id) }>
                                <img src = {sender.avatar} width = '52px' height = '52px' />
                                <div onClick={(e) => e.stopPropagation()} style={{display: 'flex', flexDirection: 'column'}}> 
                                    <div>
                                        <strong>{sender.name}</strong> 
                                        {notification}
                                    </div>
                                    <div style={{position:'relative', top: '-20px',left: '8px', color: 'GrayText'}}>
                                        {sender.content}
                                    </div>
                                </div>
                            </div>
                        )
                        )
                    }
                </div>                
            </>
        )
    }

}


export default Notifications