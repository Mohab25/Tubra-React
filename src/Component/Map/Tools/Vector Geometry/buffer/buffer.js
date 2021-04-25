import React,{useState} from 'react'
import './styles/styles.css'
import BufferPane from './BufferPane'
import BufferParametersPane from './BufferParametersPane/BufferParametersPane'
import Tooltip from '../../../../Tooltips/Tooltips'

export default function Buffer(props) {

    const [bufferPaneDisplay,toggleBufferPaneDisplay] = useState('none')
    const [bufferToolDisplayColor,toggleBufferToolDisplayColor] = useState('orange')
    // handle toolTips here
    const [toolTipDisplay,toggleTooltipDisplay] = useState('none')
    const handleClick=(e)=>{
        //bufferPaneDisplay==='none'?toggleBufferPaneDisplay('block'):toggleBufferPaneDisplay('none')
        bufferToolDisplayColor=='orange'?toggleBufferToolDisplayColor('orangered'):toggleBufferToolDisplayColor('orange')
        props.activateBuffer()
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
        <BufferPane display={bufferPaneDisplay} createPoint={props.createPoint}/>
        <BufferParametersPane/>
        <Tooltip display={toolTipDisplay} name='buffer' toolIndex={4}/>
        </>
    )
}
