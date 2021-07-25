import React from 'react'
import Input from '../input'
import Modal from '../modal'
import TwitterLargeButton from '../twitter-large-button'
import '../../../styles/components/sign-up-steps/forth-step.scss'
import { connect } from 'react-redux'
import { setVerificationVisibility } from '../../../redux/modal/action'

const VerificationCode = ({ displayVerification,setVerificationVisibility }) => {


    const handleClick = () => {
        setVerificationVisibility(false)
    }

    return(
        <>
            <Modal display={displayVerification}  title="We send you a code" >
                <p>Enter it below to verify</p>
                <Input type='text' label="Verification Code" />
                <div className='verification-link' style={{position:'relative', top:'-50px',left:'10px',fontSize:'12px'}}>
                    <a>Didn't receive email?</a>
                </div>
                <div style={{position:'relative',top:'220px'}} >
                    <TwitterLargeButton title="Finish" handleClick={handleClick} />
                </div>
                
            </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    displayVerification: state.modal.displayVerification,
})

const mapDispatchToProps = dispatch => ({

    setVerificationVisibility: display => dispatch(setVerificationVisibility(display))
})

export default connect(mapStateToProps,mapDispatchToProps)(VerificationCode)