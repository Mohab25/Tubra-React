import React,{useState} from 'react'
import './styles/styles.css'

export default function BufferParameterPane(){
    return(
        <div className='BufferParameterPane'>
            <div className='BufferParameterPaneContainer'>
                <div className='bufferCoordinates'>
                    <p>&nbsp;Coords :</p>
                    <div className='buffer-Coordinates-holder'>
                        <p>&nbsp;Binga</p>
                    </div>
                </div>
                <div className='buffer-distance-input'>
                    <p>Distance:</p>
                    <input type='number'/>
                </div>
                <div className='buffer-units-input'>
                    <p>Units:</p>
                    <input/>
                 </div>
            </div>
        </div>
    )
}