import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import './styles/styles.css'
import BufferOptionssPane from './BufferOptionsPane/BufferOptionsPane'
import Tooltip from '../../../../Tooltips/Tooltips'
import activateBufferTool from "../../../../../Actions/bufferActions/activateBufferTool";

export default function Buffer(props) {

    const [bufferPaneDisplay,toggleBufferPaneDisplay] = useState('none')
    const [bufferToolDisplayColor,toggleBufferToolDisplayColor] = useState('orange')
    // handle toolTips here
    const [toolTipDisplay,toggleTooltipDisplay] = useState('none')
    // dispatching activation action 
    const bufferActivationDispatch = useDispatch()

    const handleClick=(e)=>{
        bufferPaneDisplay==='none'?toggleBufferPaneDisplay('block'):toggleBufferPaneDisplay('none')
        bufferToolDisplayColor=='orange'?toggleBufferToolDisplayColor('orangered'):toggleBufferToolDisplayColor('orange')
        bufferActivationDispatch(activateBufferTool())
    }

    return (
        <>
        <div className='buffer' style={{backgroundColor:bufferToolDisplayColor}} onMouseEnter={()=>toggleTooltipDisplay('flex')} onMouseLeave={()=>{toggleTooltipDisplay('none')}}>
            <div className='buffer-container'>
                <div className='buffer-box' onClick={handleClick}>
                    <div>
                        <i className='far fa-circle'></i>
                    </div>
                </div>
            </div>
        </div>

        <BufferOptionssPane display={bufferPaneDisplay}/>
        <Tooltip display={toolTipDisplay} name='buffer' toolIndex={4}/>
        </>
    )
}
