import React,{useState} from 'react'
import './styles/styles.css'
import LinearMeasurePane from './LinearMeasurePane'
import Tooltip from '../../../Tooltips/Tooltips'

export default function Measure(props) {
    
    const [MeasureToolColor,setMeasureToolColor] = useState('orange')
    const [LinearMeasurePaneDisplay,setLinearMeasurePaneDisplay] = useState('none')

    // handle toolTips here
    const [toolTipDisplay,toggleTooltipDisplay] = useState('none')
    
    
    
    const toggleMeasureToolColor=()=>{
        MeasureToolColor=='orange'?setMeasureToolColor('orangered'):setMeasureToolColor('orange')
    }

    const toggleLinearMeasurePaneDisplay=()=>{
        LinearMeasurePaneDisplay=='none'?setLinearMeasurePaneDisplay('block'):setLinearMeasurePaneDisplay('none')
    }


    return (
        <>
        <div className='measure' onClick={()=>{toggleMeasureToolColor();toggleLinearMeasurePaneDisplay();props.toggleLinearMeasurement()}} style={{backgroundColor:MeasureToolColor}} onMouseEnter={()=>toggleTooltipDisplay('flex')} onMouseLeave={()=>{toggleTooltipDisplay('none')}}>
            <div className='measure-container'>
                <div className='measure-box'>
                    <div>
                        <i className='fas fa-ruler'></i>
                    </div>
                </div>
            </div>
        </div>
        <LinearMeasurePane display={LinearMeasurePaneDisplay} distance={props.distance}/>
        <Tooltip display={toolTipDisplay} name='measure' toolIndex={3}/>
        </>
    )
}
