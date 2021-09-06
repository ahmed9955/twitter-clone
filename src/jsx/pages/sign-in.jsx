import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import { login, profile, sendVerificationCode } from '../../apiClient/user'
import { setTwitterButtonActive, setVerificationVisibility } from '../../redux/modal/action'
import { setAuthToken, setNewUser } from '../../redux/user/action'
import VerificationCode from '../components/sign-up-steps/forth-step'

import '../../styles/pages/sign-in.scss'
import Input from '../components/input'
import TwitterLargeButton from '../components/twitter-large-button'

class SignIn extends React.Component {
    
        constructor(props) {
            super(props)
            this.state = {
                user: {}
            }
            
        }
        handleChange = async (e) => {

        const {name,value } = e.target

        await this.setState({user: {
            ...this.state.user,
            [name]: value
        }})

        if ( value != '' && this.state.user.email && this.state.user.password){
            this.props.setTwitterButtonActive(false)
        } else {
            this.props.setTwitterButtonActive(true)
        }
    }

     handleClick =  async(e) => {

        e.stopPropagation()

        const {email, password} = this.state.user
        const loggedInUser = await login(email, password)
        

        
        if( loggedInUser.error ){
            alert(loggedInUser.error)
            
        } else {

            if (!loggedInUser.response.verified) {
                
                if (loggedInUser){

                    this.props.setNewUser(loggedInUser.response)
                    this.props.setVerificationVisibility(true)    
                    sendVerificationCode(loggedInUser.token)
                    this.props.setAuthToken(loggedInUser.token)
                }
        
                return ;

            }

            localStorage.setItem('token', loggedInUser.token)
            const currentUser = await profile(loggedInUser.token)
            this.props.setNewUser(currentUser)
            this.props.history.push('/home')
        }
    }

render(){
    return (
        <>
            <div className='sign-in-container'>
                <div className="input-container">
                    <div style={{
                        fontSize:'38px',
                        color:'white',
                        marginBottom:"20px",
                        }}>
                        <FontAwesomeIcon icon={faTwitter}/>
                    </div>
                    <div style={{
                        fontSize:"40px",fontWeight:'bold',
                        marginBottom:"15px",
                        color:'white',
                        }}>Log in to Twitter</div>
                    <Input handleChange={this.handleChange} name="email" label="Email, or username" type="text"/>
                    <Input handleChange={this.handleChange} name="password" label="Password" type='password' />
                    <TwitterLargeButton handleClick={this.handleClick} title="Log in" />
                    <div id="sign-page-links"  style={{textAlign:'center'}}>
                        <a style={{textDecoration: 'none', color: '#1A8CD8'}} href = "/resetPassword">Forgot Password?</a> . <a href = '/' style={{textDecoration: 'none', color: '#1A8CD8'}}>Sign up for Twitter</a>
                    </div>
                </div>
            </div>
            <VerificationCode location = 'from-sign-in'   />
        </>
    )
}}



const mapDispatchToProps = dispatch => ({

    setTwitterButtonActive: active => dispatch(setTwitterButtonActive(active)),
    setNewUser: user => dispatch(setNewUser(user)),
    setVerificationVisibility: display => dispatch(setVerificationVisibility(display)),
    setAuthToken: token => dispatch(setAuthToken(token))
})

export default connect(null, mapDispatchToProps)(SignIn)