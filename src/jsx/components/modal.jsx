import React from 'react'
import '../../styles/components/modal.scss'
import ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { connect } from 'react-redux'
import { setConfirmVisibility, setModalVisibility, setPrivacyVisibility, setResetPasswordVisibility, setTwitterReplayVisibility, setVerificationVisibility } from '../../redux/modal/action'

const Modal = ({height,setModalVisibility,setPrivacyVisibility,setVerificationVisibility,setTwitterReplayVisibility,setConfirmVisibility,display,children,title, stepNumber}) => {

    return ReactDom.createPortal (
           
           <div className="modal-container" style={{ display: display?'block':'none' }}> 
            <div className="modal-overlay" onClick={ ()=> {
                
                setModalVisibility(false)
                setPrivacyVisibility(false)
                setVerificationVisibility(false)
                setConfirmVisibility(false)
                setResetPasswordVisibility(false)
                setTwitterReplayVisibility(false)
}} />

            <div className="modal-body" style={{height}} >
                <span style={{fontSize:'20px',fontWeight:'bold'}}>{stepNumber}</span>
                <div style={{textAlign:'center',fontSize:'35px',color:'white'}}><FontAwesomeIcon  icon={faTwitter}/></div>
                <div style={{fontSize:'25px',fontWeight:'bold',color:'#000',marginBottom:'20px'}}>{title}</div>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )    
}


const mapDispatchToProps = dispatch => ({

    setModalVisibility: display => dispatch(setModalVisibility(display)),
    setPrivacyVisibility: display => dispatch(setPrivacyVisibility(display)),
    setConfirmVisibility: display => dispatch(setConfirmVisibility(display)),
    setVerificationVisibility : display => dispatch(setVerificationVisibility(display)),
    setResetPasswordVisibility: display => dispatch(setResetPasswordVisibility(display)),
    setTwitterReplayVisibility: display => dispatch(setTwitterReplayVisibility(display))

})

export default connect(null,mapDispatchToProps)(Modal)  