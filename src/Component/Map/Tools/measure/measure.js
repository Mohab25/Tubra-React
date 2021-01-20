import React from 'react'
import './styles/styles.css'
import LinearMeasurePane from './LinearMeasurePane'

export default function Measure(props) {
    return (
        <>
        <div className='measure'>
            <div className='measure-container'>
                <div className='measure-box'>
                    <div>
                        <i className='fas fa-ruler'></i>
                    </div>
                </div>
            </div>
        </div>
        <LinearMeasurePane turf_distance={props.turf_distance}/>
        </>
    )
}
