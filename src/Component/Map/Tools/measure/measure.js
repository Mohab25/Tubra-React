import React,{useState} from 'react'
import './styles/styles.css'
import LinearMeasurePane from './LinearMeasurePane'

export default function Measure(props) {
    
    const [MeasureToolColor,setMeasureToolColor] = useState('orange')
    const [LinearMeasurePaneDisplay,setLinearMeasurePaneDisplay] = useState('none')

    const toggleMeasureToolColor=()=>{
        MeasureToolColor=='orange'?setMeasureToolColor('orangered'):setMeasureToolColor('orange')
    }

    const toggleLinearMeasurePaneDisplay=()=>{
        LinearMeasurePaneDisplay=='none'?setLinearMeasurePaneDisplay('block'):setLinearMeasurePaneDisplay('none')
    }


    return (
        <>
        <div className='measure' onClick={()=>{toggleMeasureToolColor();toggleLinearMeasurePaneDisplay();props.toggleLinearMeasurement()}} style={{backgroundColor:MeasureToolColor}}>
            <div className='measure-container'>
                <div className='measure-box'>
                    <div>
                        <i className='fas fa-ruler'></i>
                    </div>
                </div>
            </div>
        </div>
        <LinearMeasurePane display={LinearMeasurePaneDisplay} distance={props.distance}/>
        </>
    )
}
