import React, {useState} from 'react'
import '../../styles/pages/landingPage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import TwitterButton from '../components/twitter-button'
import { FOOTERLINKS } from './footer-links'
import { withRouter } from 'react-router'
import { setModalVisibility } from '../../redux/modal/action'
import { connect } from 'react-redux'
import { sendVerificationCode } from '../../apiClient/user'

const LandingPage = ({history,setModalVisibility}) => {

    const handleSignUpClick = () => {

        setModalVisibility(true)
        // sendVerificationCode()

    }

    const handleSignInClick = () => {
        history.push('/login')
    }
        
        return(
            
            <div className="landing-page">
                <div className="landing-page-body">
                    <div className="landing-photo" >
                        <FontAwesomeIcon icon={faTwitter} />
                    </div>
                    <div className="landing-details">
                        <div style={{fontSize:'35px',marginBottom:'55px', color:'#1DA1F2'}}>
                            <FontAwesomeIcon icon={faTwitter}/>
                        </div>
                        <span className="landing-head">Happening now</span>
                        <p className="join-text">Join Twitter today.</p>
                        <div className="landing-buttons-container">
                            <TwitterButton  handleClick={handleSignUpClick} >Sign Up</TwitterButton>
                            <TwitterButton outline="twitter-button-outline" handleClick={handleSignInClick}>Log In</TwitterButton>
                        </div>
                    </div>
                </div>
                <div className="landing-page-footer">
                    {FOOTERLINKS.map(
                        link => <a href="#">{link}</a>
                    )}
                    
                </div>
            </div>
        )
    }

    const mapDispatchToProps = dispatch => ({
        setModalVisibility: display => dispatch(setModalVisibility(display))
        
    })
    

export default  withRouter(connect(null, mapDispatchToProps)(LandingPage))