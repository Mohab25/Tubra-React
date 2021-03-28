import React,{useState} from 'react'
import './styles/styles.css'
import Tooltip from '../../../Tooltips/Tooltips'

export default function Tiles(props) {

    // handle toolTips here
    const [toolTipDisplay,toggleTooltipDisplay] = useState('none')

    let toggleWindowVisibility=()=>{
        props.toggleWindowVisibility()
    }


    return (
    <div className='tiles' onClick={toggleWindowVisibility} onMouseEnter={()=>toggleTooltipDisplay('flex')} onMouseLeave={()=>{toggleTooltipDisplay('none')}}>
        <div className='tiles-container'>
            <div className='tiles-box'>
                <div>
                    <i className='fas fa-map'></i>
                </div>
            </div>
        </div>
        <Tooltip display={toolTipDisplay} name='tiles'/>
    </div>
    )
}
