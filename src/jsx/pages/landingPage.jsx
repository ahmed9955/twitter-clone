import React, {useState} from 'react'
import '../../styles/pages/landingPage.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import TwitterButton from '../components/twitter-button'
import { FOOTERLINKS } from './footer-links'

const LandingPage = () => {

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(true)
    }
        
        return(
            <div className="landing-page">
                <div className="landing-page-body">
                    <div className="landing-photo">
                        <FontAwesomeIcon icon={faTwitter}  />
                    </div>
                    <div className="landing-details">
                        <div style={{fontSize:'35px',marginBottom:'55px'}}>
                            <FontAwesomeIcon icon={faTwitter}/>
                        </div>
                        <span className="landing-head">Happening now</span>
                        <p className="join-text">Join Twitter today.</p>
                        <div className="landing-buttons-container">
                            <TwitterButton show={show} setShow={setShow} handleClick={handleClick} >Sign Up</TwitterButton>
                            <TwitterButton outline="twitter-button-outline">Log In</TwitterButton>
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

export default LandingPage