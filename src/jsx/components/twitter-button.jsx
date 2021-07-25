import React, {useState} from 'react'
import '../../styles/components/twitter-button.scss'
import { DAYS, MONTHES, YEARS } from './birthData';
import DropDownMenu from './dropmenu';
import Input from './input';
import Modal from './modal';
import SignUpData from './sign-up-steps/first-step';

const TwitterButton = ({children,outline,show,setShow,handleClick}) => {
        

    return (
        <>
        <button onClick={handleClick} className= {`twitter-button ${outline}`}>{children}</button>
        <SignUpData show = {show} setShow={setShow} />
</>
)
}

export default TwitterButton