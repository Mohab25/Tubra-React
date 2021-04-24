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

    const conditional_style=()=>{
        /* this because some issues arise when for the 3rd and 4th tooltips
            the tooltip pushed it's underneath tools.
        */
       console.log('conditional::',props.toolIndex)
        if(props.toolIndex==undefined){
            return {display:visibility}
        }
        else if(props.toolIndex==3) {
            return{
                display:visibility,
                position:'absolute',
                top:'42%'
            }
        }
        else if(props.toolIndex==4){
            return {
                display:visibility,
                position:'absolute',
                top:'54%'
            }
        }
    }

    useEffect(()=>{toggleTooltipVisibility(props.display)},[props.display])

    return (
        <div className='ToolTip' style={conditional_style()}>
            <div className='Tooltip-container'>
                <p>{props.name}</p>
            </div>
        </div>
    )
}
