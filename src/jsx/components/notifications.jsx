import React from 'react'
import { notifications } from '../../apiClient/notifications'
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

    render(){

        return(
            <>
                <div className = "notifications">
                    {
                        this.state.notifications.map( ({sender, reciever, notification}, index) => (
                            <div style = {{backgroundColor: index%2 == 0?'skyblue': '' }}>
                                <img src = {sender.avatar} width = '52px' height = '52px' />
                                <span> <strong>{sender.name}</strong> {notification}</span>
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