import React from 'react'
import '../../styles/pages/landingPage.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
import TwitterButton from '../components/twitter-button'

class LandingPage extends React.Component {

    constructor(){
        super();
        this.state = {
            FOOTERLINKS: [
                    'About',
                    'Help Center',
                    'Terms of Service',
                    'Privacy Policy',
                    'Cookie Policy',
                    'Ads info',
                    'Blog',
                    'Status',
                    'Careers',
                    'Brand Resources',
                    'Advertising',
                    'Marketing',
                    'Twitter for Business',
                    'Developers',
                    'Directory',
                    'Settings',
                    '© 2021 Twitter, Inc.'
            ]
        }
    }

    render() {
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
                            <TwitterButton>Sign Up</TwitterButton>
                            <TwitterButton outline="twitter-button-outline">Log In</TwitterButton>
                        </div>
                    </div>
                </div>
                <div className="landing-page-footer">
                    {this.state.FOOTERLINKS.map(
                        link => <a href="#">{link}</a>
                    )}
                    
                </div>
            </div>
        )
    }

}

export default LandingPage