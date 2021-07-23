import React, {useState} from 'react'
import { DAYS, MONTHES, YEARS } from '../birthData';
import DropDownMenu from '../dropmenu';
import Input from '../input';
import Modal from '../modal';
import TwitterLargeButton from '../twitter-large-button';
import PrivacyStep from './second-step';

const SignUpData = ({show, setShow}) => {

    const [showPrivacy , setShowPrivacy] = useState(false)
    
    const handleClick = () => {
        setShow(false)
        setShowPrivacy(true)
    }

    return(

        <Modal display={show} setDisplay = {setShow} title="Create your account" >
       
        <Input type='text' label='Name'/>
        <Input type='text' label='Email'/>
       
        <section style={{fontWeight:'bold'}}>Date of birth</section>
       
        <p style={{color:'#3A3E42',fontSize:'15px'}}>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
       
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
       
        <div style={{position:'relative', top:'-22px'}}>      
            <TwitterLargeButton handleClick={handleClick} title='Next'/>
        </div>
       
        <PrivacyStep show = {showPrivacy} setShow = {setShowPrivacy}  />
 
    </Modal>
 
    )
}

export default SignUpData