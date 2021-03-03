import React from 'react'
import './styles/styles3.css'
import CAD_bg from './images/CAD.jpg'

export default function cadCard(props) {
    return (
        <div className='cad-card'>
            <div className='cad-card-container'>
                <div className='cad-card-img' onClick={()=>props.handleClick(props.pk)} style={{backgroundImage:`url(${CAD_bg})`}}></div>
                <div className='cad-card-body'>
                    <h6><b>{props.title}</b></h6>
                    <p>Ipsum ullamco do commodo culpa tempor id qui culpa.</p>
                </div>
            </div>
        </div>
    )
}
