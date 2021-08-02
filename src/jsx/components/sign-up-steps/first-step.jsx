import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { setModalVisibility, setPrivacyVisibility } from '../../../redux/modal/action';
import { DAYS, MONTHES, YEARS } from '../birthData';
import DropDownMenu from '../dropmenu';
import Input from '../input';
import Modal from '../modal';
import TwitterLargeButton from '../twitter-large-button';
import PrivacyStep from './second-step';
import {checkUserExistense, register} from '../../../apiClient/user'

const SignUpData = ({setModalVisibility,setPrivacyVisibility,display}) => {

    const [user, setUser] = useState({})
    const [errorVisibility, setErrorVisibility] = useState('hidden')
    const [errorColor, setErrorColor] = useState(false)
    const [errColor, setErrColor] = useState('#A81B46')
    const [errorValue, setErrorValue] = useState('')
    const [buttonActive, setButtonActive] = useState(true)

    const handleClick = () => {
        
       const {email, profileName,month, day, year } = user
         

        const newuser = {
              
                email,
                password: "123456789A@a",
                profileName,
                gender: "male",
                birthDate: `${day}-${MONTHES.indexOf(month)}-${year}`
}
       register(newuser)

       setModalVisibility(false)
       setPrivacyVisibility(true)

    }

    const handleChange = async (e) => {

        const { name, value } = e.target

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

            if(value == ''){
                setErrorVisibility('hidden')
                setErrorColor(false)
                setErrColor('#363E33')
                setErrorValue(' ')
            }

        }

        setUser(user => ({ ...user,[name]: value }) )

        if (user.email && user.profileName && user.month && user.day && user.year ){          
            if(user.email.length != 0 && user.profileName.length != 0 && user.month.length != 0 && user.day.length != 0 && user.year.length != 0 ){
                setButtonActive(false)
            }else{
                setButtonActive(true)
            }
             
        }
         
    }


    return(
        <Modal display={display}  title="Create your account" >

       
        <Input name='profileName' type='text' label='Name' handleChange={handleChange} />
        <Input  errorColor={errorColor} name='email' type='text' label='Email' handleChange={handleChange} />
        <label style={{position:'relative',top:'-20px',left:'-28px',color: `${errColor}` ,fontSize:'15px', visibility:`${errorVisibility}`}}>{errorValue}</label>
        {/* <Input name='password' type='password' label='Password' handleChange={handleChange} /> */}
       
        <section style={{fontWeight:'bold'}}>Date of birth</section>
       
        <p style={{color:'#3A3E42',fontSize:'15px'}}>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
       
        <div style={{display:'flex',flexDirection:'row'}}>
            <DropDownMenu name='month' handleChange={handleChange} title='Month' flex = {3} data = {MONTHES} />
            <DropDownMenu name="day" handleChange={handleChange} title='Day' flex = {1} data = {DAYS} />
            <DropDownMenu name="year" handleChange={handleChange} title='Year' flex = {2} data = {YEARS} />
        </div>
       
        <div style={{display:'flex',position:'relative',top:'-80px',left:'4px'}}>
            <label className="drop-label" style={{flex:3}} >Month</label>
            <label className="drop-label" style={{flex:1,transform: 'translate(-6px,-4px)'}}>Day</label>
            <label className="drop-label" style={{flex:2}}>Year</label>
        </div>  
       
        <div style={{position:'relative', top:'-22px'}}>      
            <TwitterLargeButton active={buttonActive} handleClick={handleClick} title='Next'/>
        </div>
       
        <PrivacyStep   />
 
    </Modal>
 
    )
}

const mapStateToProps = state => ({
    display: state.modal.display,
})


const mapDispatchToProps = dispatch => ({
    setPrivacyVisibility: display => dispatch(setPrivacyVisibility(display)),
    setModalVisibility: display => dispatch(setModalVisibility(display))
    
})

export default connect(mapStateToProps,mapDispatchToProps)(SignUpData)