import React,{useState,useEffect} from 'react'
import './style/style.css'
import VectorGeometries from './VectorGeometries'
import Tooltip from '../../../../Tooltips/Tooltips'

export default function VectorCreationTool(props) {
    const [VectorPaneDisplay,toggleVectorPaneDisplay] = useState('none')
    const [VectorToolDisplayColor,toggleVectorToolDisplayColor] = useState('orange')
    // handle toolTips here
    const [toolTipDisplay,toggleTooltipDisplay] = useState('none')

    const handleClick=(e)=>{
        VectorPaneDisplay==='none'?toggleVectorPaneDisplay('block'):toggleVectorPaneDisplay('none')
        VectorToolDisplayColor=='orange'?toggleVectorToolDisplayColor('orangered'):toggleVectorToolDisplayColor('orange')
        props.activateVector()
    }

    return (
        <>
            <div className='VectorCreation' style={{backgroundColor:VectorToolDisplayColor}} onMouseEnter={()=>toggleTooltipDisplay('flex')} onMouseLeave={()=>{toggleTooltipDisplay('none')}}>
                <div className='VectorCreation-container'>
                    <div className='VectorCreation-box' onClick={handleClick}>
                        <div>
                        <i className="fas fa-draw-polygon"></i>
                        </div>
                    </div>
                </div>
            </div>
            <VectorGeometries display={VectorPaneDisplay} createPoint={props.createPoint}/>
            <Tooltip display={toolTipDisplay} name='VectorCreation' toolIndex={5}/>
        </>
    )
}
