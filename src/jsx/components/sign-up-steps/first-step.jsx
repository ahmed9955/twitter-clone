import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { setModalVisibility, setPrivacyVisibility, setTwitterButtonActive } from '../../../redux/modal/action';
import { DAYS, MONTHES, YEARS } from '../birthData';
import DropDownMenu from '../dropmenu';
import Input from '../input';
import Modal from '../modal';
import TwitterLargeButton from '../twitter-large-button';
import PrivacyStep from './second-step';
import {checkUserExistense, register} from '../../../apiClient/user'
import { setNameCheck, setNewUser } from '../../../redux/user/action';

class SignUpData extends React.Component {

    constructor(props) {
        super(props)
        this.state = ({
            user : {},
            errorVisibility: 'hidden',
            errorColor: false,
            errColor: '#A81B46',
            errorValue: ''
        })
    }

    // const [user, setUser] = useState({})
    // const [errorVisibility, setErrorVisibility] = useState('hidden')
    // const [errorColor, setErrorColor] = useState(false)
    // const [errColor, setErrColor] = useState('#A81B46')
    // const [errorValue, setErrorValue] = useState('')
   
    

     handleClick = () => {

       const {email, profileName,month, day, year } = this.state.user
         

        const newuser = {
              
                email,
                password: "123456789A@a",
                profileName,
                gender: "male",
                birthDate: `${day}-${MONTHES.indexOf(month)}-${year}`,
}
       
        this.props.setNewUser(newuser)
        this.props.setModalVisibility(false)
        this.props.setPrivacyVisibility(true)

    }

     handleChange = async (e) => {
   
        let { name, value } = e.target
        
        

        await this.setState( prevState => ({

            user: { 
                ...prevState.user,      
                [name]: value
            }
        }))

        console.log(this.state.user)
        
        if (name === 'email'){
            
            const error = await checkUserExistense(value)
            
            if (error.error){

                this.setState({
                    errorVisibility: 'visible',
                    errorColor: true,
                    errColor: '#A81B46',
                    errorValue: error.error
                })
                
            } else{

                this.setState({
                    setErrorVisibility: 'hidden',
                    errorColor: false,
                    errColor: '#363E33',
                    errorValue: ' '
                })

            }

            if(value == ''){
                this.setState({
                    setErrorVisibility: 'hidden',
                    errorColor: false,
                    errColor: '#363E33',
                    errorValue: ' '
                })
            }

        }
 
        

            if ( this.state.errorValue == ' ' && value.length != 0 && this.state.user.profileName && this.state.user.email && this.state.user.month  && this.state.user.day && this.state.user.year  ){
                
                    this.props.setTwitterButtonActive(false)
                
            } else {
                this.props.setTwitterButtonActive(true)
            }
                
        }
    
        

    render(){
        
    const {nameCheck,setNameCheck,setNewUser,setTwitterButtonActive,setModalVisibility,setPrivacyVisibility,display} = this.props
    
    return(
        <Modal display={display}  title="Create your account" >

        <Input name='profileName'  type='text' label='Name' handleChange={this.handleChange} />
        <Input  errorColor={this.state.errorColor}  name='email' type='text' label='Email' handleChange={this.handleChange} />
        <label style={{position:'relative',top:'-20px',left:'-28px',color: `${this.state.errColor}` ,fontSize:'15px', visibility:`${this.state.errorVisibility}`}}>{this.state.errorValue}</label>
        {/* <Input name='password' type='password' label='Password' handleChange={handleChange} /> */}
       
        <div style={{fontWeight:'bold'}}>Date of birth</div>
       
        <p style={{color:'#3A3E42',fontSize:'15px'}}>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
       
        <div style={{display:'flex',flexDirection:'row'}}>
            <DropDownMenu  name='month' handleChange={this.handleChange} title='Month' flex = {3} data = {MONTHES} />
            <DropDownMenu  name="day" handleChange={this.handleChange} title='Day' flex = {1} data = {DAYS} />
            <DropDownMenu  name="year" handleChange={this.handleChange} title='Year' flex = {2} data = {YEARS} />
        </div>
       
        <div style={{display:'flex',position:'relative',top:'-80px',left:'4px'}}>
            <label className="drop-label" style={{flex:3}} >Month</label>
            <label className="drop-label" style={{flex:1,transform: 'translate(-6px,-4px)'}}>Day</label>
            <label className="drop-label" style={{flex:2}}>Year</label>
        </div>  
       
        <div style={{position:'relative', top:'-22px'}}>      
            <TwitterLargeButton  width="100%" handleClick={this.handleClick} title='Next'/>
        </div>
       
        <PrivacyStep   />
 
    </Modal>
 
    )
}}

const mapStateToProps = state => ({
    display: state.modal.display,
    nameCheck: state.user.nameCheck
})


const mapDispatchToProps = dispatch => ({
    setPrivacyVisibility: display => dispatch(setPrivacyVisibility(display)),
    setModalVisibility: display => dispatch(setModalVisibility(display)),
    setTwitterButtonActive: active => dispatch(setTwitterButtonActive(active)),
    setNewUser: user => dispatch(setNewUser(user)),
    setNameCheck: check => dispatch(setNameCheck(check))
})

export default connect(mapStateToProps,mapDispatchToProps)(SignUpData)