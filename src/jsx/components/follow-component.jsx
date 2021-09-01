import React, { useState } from 'react'

import '../../styles/components/follow-component.scss'


const FollowComponent = () => {
    
    const [followText, setFollowText] = useState('following')
    const [displyFollowButton, setDiplayFollowButton] = useState(false)

    const handleHover = () => {

        setFollowText('unFollow')
    }

    const handleLeave = () => {

        setFollowText('following')
    }

    
    return(

        <>
         <div style={{display:'flex',margin:'20px',width:'90%'}}>
                <img style={{borderRadius:'50%'}} width='48px' height='48px' src="http://localhost:2000/profile/61268b3b71f7f1b286b54cf4.png"/>
                <div style={{flex:'1',marginLeft:'10px',display:'flex', flexDirection:'column'}}>
                    <span>profile Name</span>
                    <span>@nameHash</span>
                </div>
                <div className="follow-button" style={{
                display: !displyFollowButton?'block':'none'
                ,background:'black',
                color:'white'
                }} onClick={() => setDiplayFollowButton(true)} >follow</div>
           
            <div style={{display: displyFollowButton?'block':'none'}} onClick={() => setDiplayFollowButton(false)} className={`${followText}` == 'unFollow'?'following-trans follow-button':'follow-button'} onMouseEnter={handleHover} onMouseLeave={handleLeave} >{followText}</div>
         </div>       
         
        </>
    )
}

export default FollowComponent