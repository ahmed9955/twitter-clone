import React, { useEffect } from 'react'

import '../../styles/components/right-chat.scss'

const RightChat = ({content}) => {


    return(
        <>
        
            <div className="reciever-account-right-chat">
        
                <span>
                    <div style={{fontWeight: 'bold'}}>{content.sender.name}</div>
                    <div style={{
                        textAlign:'start',
                        maxWidth:'200px', 
                        wordBreak:'break-word',
                        fontSize: '16px',
                        fontFamily: 'sans-serif'
                        }}>
                            {content.message}
                        </div>
                </span>                                
                <img src={content.sender.avatar} />
            </div>
        </>
    )
}

export default RightChat