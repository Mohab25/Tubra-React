import React,{useState} from 'react'
import './styles/styles.css'
import Tooltip from '../../../Tooltips/Tooltips'

export default function Path() {

// handle toolTips here
const [toolTipDisplay,toggleTooltipDisplay] = useState('none')
    return (
        <div className='path' onMouseEnter={()=>toggleTooltipDisplay('flex')} onMouseLeave={()=>{toggleTooltipDisplay('none')}}>
            <div className='path-container'>
                <div className='path-box'>
                    <div>
                        <i className='fa fa-road'></i>
                    </div>
                </div>
            </div>
            <Tooltip display={toolTipDisplay} name='route'/>
        </div>
    )
}
