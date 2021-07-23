import React from 'react'
import { DAYS, MONTHES, YEARS } from '../birthData'
import DropDownMenu from '../dropmenu'
import Input from '../input'
import Modal from '../modal'
import TwitterLargeButton from '../twitter-large-button'

const ConfirmSignUp = ({showConfirmSignUp, setConfirmSignUp}) => {

    return(
        <>
            <Modal stepNumber="Step 3 of 5" display={showConfirmSignUp} setDisplay = {setConfirmSignUp} title="Create your account">
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
            <TwitterLargeButton title='Sign up' />
            </div>
        </Modal>
            
        </>
    )
}

export default ConfirmSignUp