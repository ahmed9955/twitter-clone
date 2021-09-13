import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { UpdatePasswordAndGender } from '../../../apiClient/user'
import { setResetPasswordVisibility, setTwitterButtonActive } from '../../../redux/modal/action'
import DropDownMenu from '../dropmenu'
import Input from '../input'
import Modal from '../modal'
import TwitterLargeButton from '../twitter-large-button'

class ResetPasswordAndGender extends React.Component {

    constructor(){
        super()

        this.state = {
        
            passwordAndGender: {}
        
        }
    }

    handleChange = async (e) => {

    const {name, value} = e.target 

    await this.setState({
        
        passwordAndGender: {
        
            ...this.state.passwordAndGender,
            [name]: value == 'gender' ? 'male' : value

    }})

    if (value !== ' ' && this.state.passwordAndGender.password && this.state.passwordAndGender.gender) {

        this.props.setTwitterButtonActive(false)
    
    } else {
        
        this.props.setTwitterButtonActive(true)

    }

    console.log(this.state.passwordAndGender)

}

     handleClick = async () => {
        
       const update = await UpdatePasswordAndGender(this.state.passwordAndGender.gender, this.state.passwordAndGender.password, this.props.authToken)

       if (update.error){

        alert(update.error)

       } else {

        this.props.setResetPasswordVisibility(false)
        this.props.history.push('/login')
    }

        

    }

    render(){
        return(
            <>
                <Modal display={ this.props.displayResetPassword }  title="Complete Registeration" >
                    
                    <Input name="password" type='password' label="password" handleChange={this.handleChange} />
                    <div >
                        <DropDownMenu handleChange={this.handleChange}   name = "gender" data = { ['gender','male', 'female'] } />
                    </div>
                    
              
                    <div style={{position:'relative',top:'200px'}} >
                        <TwitterLargeButton  width="100%"  title="finish" handleClick={this.handleClick} />
                    </div>                    
                </Modal>
            </>
        )
    }
}


const mapStateToProps = state => ({

 displayResetPassword: state.modal.displayResetPassword,
 authToken: state.user.token

})


const mapDispatchToProps = dispatch => ({

    setResetPasswordVisibility: display => dispatch(setResetPasswordVisibility(display) ),
    setTwitterButtonActive: display => dispatch(setTwitterButtonActive(display))
})



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordAndGender))