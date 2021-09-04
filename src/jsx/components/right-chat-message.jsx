import React from 'react'

import '../../styles/components/right-chat.scss'

const RightChat = ({content}) => {

    return(
        <>
        
            <div className="reciever-account-right-chat">
                <img src={content.sender.avatar} />
                <span>
                    <div>{content.sender.name}</div>
                    <div style={{
                        textAlign:'start',
                        maxWidth:'200px', 
                        wordBreak:'break-word'
                        }}>
                            {content.message}
                        </div>
                </span>                                
            </div>
        </>
    )
}

export default RightChat