import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { resetPassword } from '../../apiClient/user'
import { setTwitterButtonActive } from '../../redux/modal/action'
import Input from '../components/input'
import TwitterLargeButton from '../components/twitter-large-button'

class ResetPasswordPage extends React.Component {

    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount(){

        this.props.setTwitterButtonActive(false)

    }

    handleChange = async (e) => {
        const {value, name} = e.target

        await this.setState({[name]: value })
        
    }

    handleReset = async () => {
        const {email, password} = this.state
        const response = await resetPassword(email, password)

        if (response.success){
            console.log(response)
            this.props.history.push('/login')
        } else {
            alert('please enter real data ')
        }
        
    }
   
    render(){

        return(
            <>
            <div className='sign-in-container'>
                <div className="input-container">
                <div style={{
                        fontSize:"40px",fontWeight:'bold',
                        marginBottom:"15px",
                        color:'white',
                        }}>Log in to Twitter</div>
                    <Input handleChange={this.handleChange} name="email" label="type your email" type="text"/>
                    <Input handleChange={this.handleChange} name="password" label="type new password" type='password' />
                    <TwitterLargeButton width="350px" handleClick={this.handleReset}  title="Reset Password" />
                    {/* <button onClick={this.handleReset}>Reset</button> */}
                </div>
            </div>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    setTwitterButtonActive: active => dispatch(setTwitterButtonActive(active))
})

export default connect(null, mapDispatchToProps)(withRouter(ResetPasswordPage))