import React, {useState} from 'react'
import { connect } from 'react-redux'
import { checkUserExistense, register, sendVerificationCode } from '../../../apiClient/user'
import { setConfirmVisibility, setTwitterButtonActive, setVerificationVisibility } from '../../../redux/modal/action'
import { setAuthToken, setNewUser } from '../../../redux/user/action'
import { DAYS, MONTHES, YEARS } from '../birthData'
import DropDownMenu from '../dropmenu'
import Input from '../input'
import Modal from '../modal'
import TwitterLargeButton from '../twitter-large-button'
import VerificationCode from './forth-step'

const ConfirmSignUp = ({ user,setNewUser,displayConfirm, setConfirmVisibility, setVerificationVisibility,setAuthToken, setTwitterButtonActive}) => {

    const [errorVisibility, setErrorVisibility] = useState('hidden')
    const [errorColor, setErrorColor] = useState(false)
    const [errColor, setErrColor] = useState('#A81B46')
    const [errorValue, setErrorValue] = useState(' ')


    const handleClick = async () => {
        
        const token =  await register(user)
        
        setConfirmVisibility(false)
        setVerificationVisibility(true)
        setAuthToken(token.token)
        setTwitterButtonActive(true)

    }


    const handleChange = async (e) => {

        const { name, value } = e.target

        setNewUser({...user,[name]:value} )
        
        if (name === 'email'){


            const error = await checkUserExistense(value)

            if (error.error){
                setErrorVisibility('visible')
                setErrorColor(true)
                setErrColor('#A81B46')
                setErrorValue(error.error)
                           
            } else{
                
                setErrorVisibility('hidden')
                setErrorColor(false)
                setErrColor('#363E33')
                setErrorValue(' ')
            }

        }

        if(value == ''){
            setErrorVisibility('hidden')
            setErrorColor(false)
            setErrColor('#363E33')
            setErrorValue(' ')

        }

        if ( errorValue == ' ' && value.length != 0 && user.profileName && user.email && user.birthDate  ){
            
            setTwitterButtonActive(false)
        
    } else {
        setTwitterButtonActive(true)
    }
        
    }


    return(
        <>
            <Modal display={displayConfirm} stepNumber="Step 3 of 5"  title="Create your account">
            <Input name='profileName' val={user?user.profileName:''}  type='text' handleChange={handleChange} label='Name'/>
            <Input errorColor={errorColor} name='email' val={user?user.email:''}  type='text' handleChange={handleChange} label='Email'/>
            <label style={{position:'relative',top:'-20px',left:'-28px',color: `${errColor}` ,fontSize:'15px', visibility:`${errorVisibility}`}}>{errorValue}</label>
            <div style={{display:'flex',flexDirection:'row'}}>
                <DropDownMenu handleChange={handleChange} val={user? MONTHES[user.birthDate.split('-')[1]]:''}  title='Month' flex = {3} data = {MONTHES} />
                <DropDownMenu  handleChange={handleChange} val={user?user.birthDate.split('-')[0]:''} title='Day' flex = {1} data = {DAYS} />
                <DropDownMenu handleChange={handleChange} val={user?user.birthDate.split('-')[2]:''}  title='Year' flex = {2} data = {YEARS} />
            </div>
            <div style={{display:'flex',position:'relative',top:'-80px',left:'4px'}}>
                <label className="drop-label" style={{flex:3}} >Month</label>
                <label className="drop-label" style={{flex:1,transform: 'translate(-6px,-4px)'}}>Day</label>
                <label className="drop-label" style={{flex:2}}>Year</label>
            </div>  

            <p style={{color:'#000',position:'relative',top:'-40px'}}>
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
    user: state.user.user,

})

const mapDispatchToProps = dispatch => ({
    
    setConfirmVisibility: display => dispatch(setConfirmVisibility(display)),
    setVerificationVisibility: display => dispatch(setVerificationVisibility(display)),
    setNewUser: user => dispatch(setNewUser(user)),
    setAuthToken: token => dispatch(setAuthToken(token)),
    setTwitterButtonActive: active => dispatch(setTwitterButtonActive(active))
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSignUp)