import React,{useState} from 'react'
import './styles/styles.css'
import BufferPane from './BufferPane'
import BufferParametersPane from './BufferParametersPane/BufferParametersPane'
import Tooltip from '../../../../Tooltips/Tooltips'

export default function Buffer(props) {

    const [bufferPaneDisplay,toggleBufferPaneDisplay] = useState('none')
    // handle toolTips here
    const [toolTipDisplay,toggleTooltipDisplay] = useState('none')
    const handleClick=(e)=>{
        bufferPaneDisplay==='none'?toggleBufferPaneDisplay('block'):toggleBufferPaneDisplay('none')
        props.activateBuffer()
    }

    return (
        <>
        <div className='buffer' style={{backgroundColor:bufferPaneDisplay=='none'?'orange':'orangered'}} onMouseEnter={()=>toggleTooltipDisplay('flex')} onMouseLeave={()=>{toggleTooltipDisplay('none')}}>
            <div className='buffer-container'>
                <div className='buffer-box' onClick={handleClick}>
                    <div>
                        <i className='far fa-circle'></i>
                    </div>
                </div>
            </div>
        </div>
        <BufferPane display={bufferPaneDisplay}/>
        <BufferParametersPane/>
        <Tooltip display={toolTipDisplay} name='buffer'/>
        </>
    )
}
