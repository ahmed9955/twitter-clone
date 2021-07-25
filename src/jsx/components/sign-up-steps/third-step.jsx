import React, {useState} from 'react'
import { connect } from 'react-redux'
import { setConfirmVisibility, setVerificationVisibility } from '../../../redux/modal/action'
import { DAYS, MONTHES, YEARS } from '../birthData'
import DropDownMenu from '../dropmenu'
import Input from '../input'
import Modal from '../modal'
import TwitterLargeButton from '../twitter-large-button'
import VerificationCode from './forth-step'

const ConfirmSignUp = ({ displayConfirm, setConfirmVisibility, setVerificationVisibility }) => {

    const handleClick = () => {
        setConfirmVisibility(false)
        setVerificationVisibility(true)      
    }

    return(
        <>
            <Modal display={displayConfirm} stepNumber="Step 3 of 5"  title="Create your account">
            <Input type='text' label='Name'/>
            <Input type='text' label='Email'/>

            <div style={{display:'flex',flexDirection:'row'}}>
                <DropDownMenu title='Month' flex = {3} data = {MONTHES} />
                <DropDownMenu title='Day' flex = {1} data = {DAYS} />
                <DropDownMenu title='Year' flex = {2} data = {YEARS} />
            </div>
            <div style={{display:'flex',position:'relative',top:'-80px',left:'4px'}}>
                <label className="drop-label" style={{flex:3}} >Month</label>
                <label className="drop-label" style={{flex:1,transform: 'translate(-6px,-4px)'}}>Day</label>
                <label className="drop-label" style={{flex:2}}>Year</label>
            </div>  

            <p style={{color:'#cccc',position:'relative',top:'-40px'}}>
                By signing up, you agree to the 
                Terms of Service and 
                Privacy Policy, including 
                Cookie Use. Others will be able to find you by email or phone number when provided · 
                Privacy Options
            </p>
            <div style={{position:'relative', top:'-45px'}}>
            <TwitterLargeButton title='Sign up' handleClick={handleClick} />
            </div>
            <VerificationCode   />
        </Modal>

        </>
    )
}


const mapStateToProps = state => ({

    displayConfirm: state.modal.displayConfirm,

})

const mapDispatchToProps = dispatch => ({
    
    setConfirmVisibility: display => dispatch(setConfirmVisibility(display)),
    setVerificationVisibility: display => dispatch(setVerificationVisibility(display))

})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSignUp)