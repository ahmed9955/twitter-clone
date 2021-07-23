import React from 'react'
import '../../styles/components/modal.scss'
import ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const Modal = ({display,children,title, setDisplay, stepNumber}) => {

    return ReactDom.createPortal (
           <div className="modal-container" style={{display: display?'block':'none'}}> 
            <div className="modal-overlay" onClick={()=> setDisplay(false)} />
            <div className="modal-body"  >
                <span style={{fontSize:'20px',fontWeight:'bold'}}>{stepNumber}</span>
                <div style={{textAlign:'center',fontSize:'35px',color:'white'}}><FontAwesomeIcon  icon={faTwitter}/></div>
                <div style={{fontSize:'25px',fontWeight:'bold',color:'#D9D9D9',marginBottom:'20px'}}>{title}</div>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )    
}

export default Modal