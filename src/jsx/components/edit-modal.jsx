import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { profile, UpdateProfile } from '../../apiClient/user'
import { setEditModalVisibility, setTwitterButtonActive } from '../../redux/modal/action'
import { setAuthToken, setNewUser } from '../../redux/user/action'
import { DAYS, MONTHES, YEARS, MONTHESNUNBER } from './birthData'
import DropDownMenu from './dropmenu'
import Input from './input'
import Modal from './modal'
import TwitterLargeButton from './twitter-large-button'

class EditModal extends React.Component {
    
    constructor(){
        super()

        this.state = {
            
            udpatedUser: {
                day: '',
                year: '',
                month : ''
            },

        }
    }

    async componentDidMount() {

        const profileUser = await profile(localStorage.token)
    
        if (profileUser){
    
            await this.setState({ udpatedUser: profileUser })
            
            await this.setState({udpatedUser : {
                ...this.state.udpatedUser,
                month:  MONTHES[profileUser.birthDate.split('-')[1]],
                day: profileUser.birthDate.split('-')[0],
                year:profileUser.birthDate.split('-')[2]  
            }})

            console.log(this.state.udpatedUser)    
        }

    }

    handleClick = async () => {
    
        let raw = this.state.udpatedUser
        raw.birthDate = `${raw.day}-${MONTHESNUNBER[raw.month]}-${raw.year}`
        delete raw.day
        delete raw.month
        delete raw.year
        
        UpdateProfile(raw)
        this.props.setEditModalVisibility(false)
        setTimeout(() => window.location.reload() , 1000)    
    }


     handleChange = async (e) => {

        const { name, value } = e.target

        const { user } = this.props

        console.log(name, value)

        this.setState({udpatedUser:{...this.state.udpatedUser, [name]:value} })

    if ( value.length != 0 && user.profileName && user.birthDate  ){
            
            setTwitterButtonActive(false)
        
    } else {
        setTwitterButtonActive(true)
    }
        
    }

render() {

    return(
        <>
        {this.props.user && 
            <Modal height="fit-content" display = { this.props.displayEdit } >
            <Input name='profileName' val={this.state.udpatedUser.profileName}  type='text' handleChange={this.handleChange} label='Name'/>
            <div style={{display:'flex',flexDirection:'row'}}>
                <DropDownMenu  val={this.state.udpatedUser.month} handleChange={this.handleChange}   name = "month"  title='Month' flex = {3} data = {MONTHES} />
                <DropDownMenu  val={this.state.udpatedUser.day}   handleChange={this.handleChange} flex = {1} name = "day"  data = {DAYS} />
                <DropDownMenu  val={this.state.udpatedUser.year}  handleChange={this.handleChange}  flex = {2} name = "year"  data = {YEARS} />
            </div>
            <div style={{display:'flex',position:'relative',top:'-80px',left:'4px'}}>
                <label className="drop-label" style={{flex:3}} >Month</label>
                <label className="drop-label" style={{flex:1,transform: 'translate(-6px,-4px)'}}>Day</label>
                <label className="drop-label" style={{flex:2}}>Year</label>
            </div>  

            <div style={{position:'relative'}}>
            <TwitterLargeButton width = '100%' title='Update' handleClick={this.handleClick} />
            </div>
        </Modal> 
        
        }
        </>
    )
}
    
}

const mapStateToProps = (state) => ({

    displayEdit: state.modal.displayEdit,
    user: state.user.user,
})

const mapDispatchToProps = dispatch => ({
    
    setNewUser: user => dispatch(setNewUser(user)),
    setAuthToken: token => dispatch(setAuthToken(token)),
    setTwitterButtonActive: active => dispatch(setTwitterButtonActive(active)),
    setEditModalVisibility: display => dispatch(setEditModalVisibility(display)) 
    

})


export default connect(mapStateToProps, mapDispatchToProps)(EditModal)