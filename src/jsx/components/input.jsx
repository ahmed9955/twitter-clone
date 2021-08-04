import React from 'react'

import '../../styles/components/custom-input.scss'


const Input = ({type,label,handleChange,name,errorColor,val}) => {
    return(
        <>
            <input value={val}  name={name} className={errorColor?'errorColor ':'custom-input'} type={type} onChange={handleChange} />
            <label className= {errorColor?'errorlabelColor label-input':'label-input'}>{label}</label>
        </>
    )
}

export default Input