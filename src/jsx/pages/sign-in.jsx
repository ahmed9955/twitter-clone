import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'
import { connect } from 'react-redux'
import { login, profile } from '../../apiClient/user'
import { setTwitterButtonActive } from '../../redux/modal/action'
import { setNewUser } from '../../redux/user/action'

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

     handleClick =  async() => {
        const {email, password} = this.state.user
        const loggedInUser = await login(email, password)
        if( loggedInUser.error ){
            alert(loggedInUser.error)
        } else {
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
                    <div style={{fontSize:'38px',color:'white',marginBottom:"20px"}}>
                        <FontAwesomeIcon icon={faTwitter}/>
                    </div>
                    <div style={{fontSize:"40px",fontWeight:'bold',marginBottom:"15px",color:'white'}}>Log in to Twitter</div>
                    <Input handleChange={this.handleChange} name="email" label="Email, or username" type="text"/>
                    <Input handleChange={this.handleChange} name="password" label="Password" type='password' />
                    <TwitterLargeButton handleClick={this.handleClick} title="Log in" />
                    <div id="sign-page-links"  style={{textAlign:'center'}}>
                        <a>Forgot Password?</a> . <a>Sign up for Twitter</a>
                    </div>
                </div>
            </div>
        </>
    )
}}

const mapDispatchToProps = dispatch => ({
    setTwitterButtonActive: active => dispatch(setTwitterButtonActive(active)),
    setNewUser: user => dispatch(setNewUser(user))
})

export default connect(null,mapDispatchToProps)(SignIn)