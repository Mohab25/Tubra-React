import React,{useState,useEffect} from 'react'
import './styles/styles.css'
import ToolTip from '../../../Tooltips/Tooltips'

export default function Identify(props) {
    let [backgroundColor,setBackgroundColor] = useState('orange')

    // control toolTip 
    const [display,changeDisplay]=useState('none')

    /******** handle toolTips */ 
    const handleClick=()=>{
        if(backgroundColor=='orange'){
            setBackgroundColor('orangered')
        }
        else{
            setBackgroundColor('orange')
        }
        
    }
                                                                                                          
    return (
        <div className='identify' onClick={handleClick} style={{backgroundColor:backgroundColor}} onMouseEnter={()=>{changeDisplay('flex')}} onMouseLeave={()=>changeDisplay('none')}>
            <div className='identify-container'>
                <div className='identify-box'>
                    <div><i className='fa fa-info'></i></div>
                </div>
            </div>
            <ToolTip name='identify' display={display}/>
        </div>
    )
}
