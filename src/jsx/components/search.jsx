import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchOutlined } from '@material-ui/icons'
import React from 'react'
import { withRouter } from 'react-router'
import { searchUsers } from '../../apiClient/user'
import '../../styles/components/search.scss'
import FollowComponent from './follow-component'

class Search extends React.Component {

    constructor(){
        super()
        this.state = {
            usersearch: []
        }
    }

    handleChange = async (e) => {

        const usersearchresult = await searchUsers(e.target.value)
        
        if(usersearchresult){

            this.setState({usersearch: usersearchresult })

        }
    }   

    handleClick = (e, id) => {

        e.stopPropagation()
        window.location.href = `http://localhost:3000/home/profile/${id}`
    }

    render(){
        return(
            <>
                <input  onChange={this.handleChange} id ="searchInput" placeholder= 'search' />
                <div style={{backgroundColor: 'white'}} id="search-result">
                    {
                        this.state.usersearch.map(user => 
                        <div ><FollowComponent  {...user}  /></div>
                        )
                    }
                </div>
            </>
        )
    }
}

export default withRouter(Search)