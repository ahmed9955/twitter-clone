import React from 'react'

import '../../styles/components/custom-input.scss'


const Input = ({type,label,handleChange}) => {
    return(
        <>
            <input className="custom-input" type={type} onChange={handleChange} />
            <label className='label-input'>{label}</label>
        </>
    )
}

export default Input