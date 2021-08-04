import React from 'react'
import '../../styles/components/dropmenu.scss'

const DropDownMenu = ({flex,data,title,name,handleChange,val}) => {
    return(
        <>
            <select value={val} name={name} onChange={handleChange} style={{flex,color:'white',backgroundColor:'black', paddingTop:"10px"}} className='drop-menu'>
                {data.map(data => <option>{data}</option> )}
            </select>
    
        </>
    )
}

export default DropDownMenu