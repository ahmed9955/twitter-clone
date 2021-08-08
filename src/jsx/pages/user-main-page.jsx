import React from 'react'

import '../../styles/pages/user-main-page.scss'
import SideNavBar from '../components/side-nav-bar'
import TweetsView from '../components/tweets-view'

const UserMainPage = () => {

    return(
        <>  
            <div style={{display:'flex',flexDirection:'row'}}>
                <SideNavBar />
                <TweetsView/> 
            </div>
        </>
    )

}

export default UserMainPage