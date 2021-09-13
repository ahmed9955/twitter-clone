import React from 'react'

import '../../styles/components/left-chat.scss'

const LeftChat = ({content}) => {

    return(
        <>
        
            <div className="reciever-account-left-chat">
                <img src={content.sender.avatar} />
                <span>
                    <div style={{fontWeight: 'bold'}} >{content.sender.name}</div>
                    <div style={{
                        textAlign:'start',
                        maxWidth:'200px', 
                        wordBreak:'break-word',
                        
                        }}>
                            {content.message}
                        </div>
                </span>                                
            </div>
        </>
    )
}

export default LeftChat