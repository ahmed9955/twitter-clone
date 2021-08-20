import React from 'react'

import '../../styles/components/custom-input.scss'


const Input = ({type,label,handleChange,name,errorColor,val,handleFocus,handleClick}) => {
    return(
        <>
            <input onClick={handleClick} onFocus={handleFocus} placeholder=" " value={val}   name={name} className={errorColor?'errorColor ':'custom-input'} type={type} onChange={handleChange} />
            <label className= {errorColor?'errorlabelColor label-input':'label-input'}>{label}</label>
        </>
    )
}

export default Input