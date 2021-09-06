import React, { useEffect } from 'react'
import Input from '../input'
import Modal from '../modal'
import TwitterLargeButton from '../twitter-large-button'
import '../../../styles/components/sign-up-steps/forth-step.scss'
import { connect } from 'react-redux'
import { setResetPasswordVisibility, setTwitterButtonActive, setVerificationVisibility } from '../../../redux/modal/action'
import { ConfirmVerification } from '../../../apiClient/user'
import { withRouter } from 'react-router'
import ResetPasswordAndGender from './fifth-step'

const VerificationCode = ({ location,displayVerification,setVerificationVisibility, setTwitterButtonActive,twitterButtonActive,authToken, setResetPasswordVisibility }) => {


    const handleChange = async (e) => {

       setTwitterButtonActive(false)
  
       const code = await ConfirmVerification(e.target.value, authToken )

       console.log(code)

       // if(!code.success){
        //   setTwitterButtonActive(false)
        // }else{
        //     setTwitterButtonActive(true)
        // }
        
        }


    const handleClick = () => {

        setVerificationVisibility(false)

        if (location !== 'from-sign-in'){

            setResetPasswordVisibility(true)
            
        }

        if (location !== 'from-sign-in'){

            setTwitterButtonActive(true)

        }
        
        // localStorage.setItem('token',authToken )
        // history.push('/login')
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
                    <TwitterLargeButton width = "100%"   title="next" handleClick={handleClick} />
                </div>
                <ResetPasswordAndGender />        
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
    setResetPasswordVisibility: display => dispatch(setResetPasswordVisibility(display)),
    setTwitterButtonActive: active => dispatch(setTwitterButtonActive(active)),
    
})

export default connect(mapStateToProps,mapDispatchToProps)(VerificationCode)