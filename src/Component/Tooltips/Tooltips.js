import React,{useEffect,useState} from 'react'
import './styles/styles.css'

export default function Tooltips(props) {
const [visibility,toggleTooltipVisibility] = useState(props.display)
    
    const addTooltip=()=>{
       toggleTooltipVisibility('block')
    }

   const removeTooltip=()=>{
       toggleTooltipVisibility('none')
    }

    useEffect(()=>{toggleTooltipVisibility(props.display)},[props.display])

    return (
        <div className='ToolTip' style={{display:visibility}}>
            <div className='Tooltip-container'>
                <p>{props.name}</p>
            </div>
        </div>
    )
}
