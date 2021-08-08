import React, { useEffect } from 'react'
import Input from '../input'
import Modal from '../modal'
import TwitterLargeButton from '../twitter-large-button'
import '../../../styles/components/sign-up-steps/forth-step.scss'
import { connect } from 'react-redux'
import { setTwitterButtonActive, setVerificationVisibility } from '../../../redux/modal/action'
import { ConfirmVerification } from '../../../apiClient/user'
import { withRouter } from 'react-router'

const VerificationCode = ({ displayVerification,setVerificationVisibility, setTwitterButtonActive,twitterButtonActive,authToken,history }) => {


    const handleChange = async (e) => {

       const code = await ConfirmVerification(e.target.value, authToken )

        if(!code.success){
          setTwitterButtonActive(false)
        }else{
            setTwitterButtonActive(true)
        }
        
        }


    const handleClick = () => {
        setVerificationVisibility(false)
        localStorage.setItem('token',authToken )
        history.push('/home')
    }

    return(
        <>
            <Modal display={displayVerification}  title="We send you a code" >
                <p>Enter it below to verify</p>
                <Input type='text' label="Verification Code" handleChange={handleChange} />
                <div className='verification-link' style={{position:'relative', top:'-40px',left:'10px',fontSize:'12px'}}>
                    <a>Didn't receive email?</a>
                </div>
                <div style={{position:'relative',top:'220px'}} >
                    <TwitterLargeButton   title="Finish" handleClick={handleClick} />
                </div>
                
            </Modal>
        </>
    )
}

const mapStateToProps = state => ({
    displayVerification: state.modal.displayVerification,
    twitterButtonActive: state.modal.twitterButtonActive,
    authToken: state.user.token
})

const mapDispatchToProps = dispatch => ({

    setVerificationVisibility: display => dispatch(setVerificationVisibility(display)),
    setTwitterButtonActive: active => dispatch(setTwitterButtonActive(active))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(VerificationCode))