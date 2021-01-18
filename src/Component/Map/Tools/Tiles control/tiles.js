import React from 'react'
import './styles/styles.css'

export default function tiles(props) {

    let toggleWindowVisibility=()=>{
        props.toggleWindowVisibility()
    }


    return (
    <div className='tiles' onClick={toggleWindowVisibility}>
        <div className='tiles-container'>
            <div className='tiles-box'>
                <div>
                    <i className='fas fa-map'></i>
                </div>
            </div>
        </div>
    </div>
    )
}
