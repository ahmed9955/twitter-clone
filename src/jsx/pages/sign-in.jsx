import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import '../../styles/pages/sign-in.scss'
import Input from '../components/input'
import TwitterLargeButton from '../components/twitter-large-button'

const SignIn = () => {
    
    return (
        <>
            <div className='sign-in-container'>
                <div className="input-container">
                    <div style={{fontSize:'38px',color:'white',marginBottom:"20px"}}>
                        <FontAwesomeIcon icon={faTwitter}/>
                    </div>
                    <div style={{fontSize:"40px",fontWeight:'bold',marginBottom:"15px",color:'white'}}>Log in to Twitter</div>
                    <Input label="Email, or username" type="text"/>
                    <Input label="Password" type='password' />
                    <TwitterLargeButton title="Log in"/>
                    <div id="sign-page-links"  style={{textAlign:'center'}}>
                        <a>Forgot Password?</a> . <a>Sign up for Twitter</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn