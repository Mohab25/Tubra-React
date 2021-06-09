import React,{useState} from 'react'
import { useSelector } from "react-redux";
import './styles/styles.css'
import LinearMeasurePane from './LinearMeasurePane'
import Tooltip from '../../../Tooltips/Tooltips'
//geoman
import '@geoman-io/leaflet-geoman-free';  
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';  

export default function Measure(props) {
    
    const [MeasureToolColor,setMeasureToolColor] = useState('orange')
    const [LinearMeasurePaneDisplay,setLinearMeasurePaneDisplay] = useState('none')

    // handle toolTips here
    const [toolTipDisplay,toggleTooltipDisplay] = useState('none')
    
    // getting the map 
    let map = useSelector(state=>state.gettingMapRefReducer.MapRef)

    const toggleMeasureToolColor=()=>{
        MeasureToolColor=='orange'?setMeasureToolColor('orangered'):setMeasureToolColor('orange')
    }

    const toggleLinearMeasurePaneDisplay=()=>{
        LinearMeasurePaneDisplay=='none'?setLinearMeasurePaneDisplay('block'):setLinearMeasurePaneDisplay('none')
    }

    const lineRulerCreation=(e)=>{
        console.log('the e',e)
        if(LinearMeasurePaneDisplay=='none'){
            
            map.pm.disableDraw()
            // open draw mode     
            map.pm.enableDraw('Line', {
            snappable: false,
            snapDistance: 20,
            continueDrawing:true,
            });  
        }

        else{
            map.pm.disableDraw()
        }
        
        
    }


    return (
        <>
        <div className='measure' onClick={()=>{toggleMeasureToolColor();toggleLinearMeasurePaneDisplay();props.toggleLinearMeasurement();lineRulerCreation()}} style={{backgroundColor:MeasureToolColor}} onMouseEnter={()=>toggleTooltipDisplay('flex')} onMouseLeave={()=>{toggleTooltipDisplay('none')}}>
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
