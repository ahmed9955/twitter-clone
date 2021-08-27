import React, { useEffect, useState } from 'react'
import { Route, Switch, withRouter } from 'react-router'
import '../../styles/components/follow-page.scss'
import FollowersTab from './followers-tap'
import FollowingTab from './following-tab'

const FollowPage = ({match}) => {

    const [followingTab, setFollowingTab] = useState(false)
    const [followersTab, setFollowersTab] = useState(false)

    useEffect(() => {
        
        if(match.path === '/home/followers') {
        setFollowersTab(true)
        setFollowingTab(false)
    } else {
        setFollowersTab(false)
        setFollowingTab(true)
    }
    },[])

    return(
        <>
            <div style={{borderRight:'2px solid #E6E7E7',minHeight:'100vh'}}>

 
                <div  className="follow-nav-bar"> 
                     <a className={followersTab?'nav-focus':''}  onClick={() => {
                    
                        setFollowersTab(true)
                        setFollowingTab(false)
                        

                    }}><span>Followers</span></a>
                    <a  className={followingTab?'nav-focus':''} onClick={() => {

                        setFollowersTab(false)
                        setFollowingTab(true)

                    }} ><span>Following</span></a>

                </div>
                <div>
                    {
                        followersTab &&
                        
                        <FollowersTab/>
                    }

                    { 
                        followingTab && 
                        
                        <FollowingTab/>
                    }
                    
                </div>
            </div>
  
        </>
    )
}

export default withRouter(FollowPage)