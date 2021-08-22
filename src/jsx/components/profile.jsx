import React from 'react'
import '../../styles/components/profile.scss'
import '../../assets/profile.png'

const Profile = () => {

    return(
        <>
            <div className='profile-container'>
                <div className='profile-navbar'>

                </div>
                <div className='profile-details'>
                    <div className='portrait'>
                        <img style={{visibility:'hidden'}} width="100%" height="100%" src = "" />
                    </div>
                    <div className="profile-picture-rounded">
                        <img src="../../assets/profile.png" width='100px' height='100px' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile