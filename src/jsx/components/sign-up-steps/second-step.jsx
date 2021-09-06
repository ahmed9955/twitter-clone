import React from 'react'
import Modal from '../modal'
import '../../../styles/components/sign-up-steps/second-step.scss'
import ConfirmSignUp from './third-step'
import TwitterLargeButton from '../twitter-large-button'
import { connect } from 'react-redux'
import { setConfirmVisibility, setPrivacyVisibility } from '../../../redux/modal/action'

const PrivacyStep = ({ displayPrivacy,setPrivacyVisibility,setConfirmVisibility }) => {

    const handleClick = () => {

        setPrivacyVisibility(false)
        setConfirmVisibility(true)    
    }    

    return(
        <>

            <Modal display={ displayPrivacy } title="Customize your experience" >
                <div style={{fontSize:'20px',fontWeight:'bold',color:'#000',marginBottom:'20px',marginTop:'45px'}}>Track where you see Twitter content across the web</div>
                
                <span>Twitter uses this data to personalize your experience. This web browsing history will never be stored with your name, email, or phone number.</span>
                
                <label style={{float:'right'}} >
                    <input checked className="privacy-check" type='checkbox' style={{width:'20px',height:'20px'}}/>
                </label>
                
                <p style={{marginTop:'25px',fontSize:'15px', color:'#565D62'}}>For more details about these settings, visit the 
                
                <a  id='help-center' style={{color:'#1B95E0'}} > Help Center</a>.</p>
                
                <div style={{position:'relative', top:'180px'}}>
                    <TwitterLargeButton width= "100%" handleClick={handleClick} title = 'Next' />
                </div>
                
                <ConfirmSignUp  />
            
            </Modal> 

        </>
    )
}

const mapStateToProps = state => ({
    displayPrivacy: state.modal.displayPrivacy,
})

const mapDispatchToProps = dispatch => ({

    setPrivacyVisibility: display => dispatch(setPrivacyVisibility(display)),
    setConfirmVisibility: display => dispatch(setConfirmVisibility(display)),

})



export default connect(mapStateToProps, mapDispatchToProps)(PrivacyStep)