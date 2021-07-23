import React from 'react'
import '../../styles/components/dropmenu.scss'

const DropDownMenu = ({flex,data,title}) => {
    return(
        <>
            <select  style={{flex,color:'white', paddingTop:"10px"}} className='drop-menu'>
                {data.map(data => <option>{data}</option> )}
            </select>
    
        </>
    )
}

export default DropDownMenu