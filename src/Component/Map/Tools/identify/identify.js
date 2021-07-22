import React,{useState,useEffect} from 'react'
import {useDispatch } from "react-redux";
import './styles/styles.css'
import ToolTip from '../../../Tooltips/Tooltips'
import activateIdentifyTool from "../../../../Actions/identifyActions/activateIdentifytool";

export default function Identify(props) {
    let [backgroundColor,setBackgroundColor] = useState('orange')

    // control toolTip 
    const [display,changeDisplay]=useState('none')

    // dispatch for the activation 
    const activationDispatch = useDispatch()

    /******** handle toolTips */ 
    const handleClick=()=>{
        if(backgroundColor=='orange'){
            setBackgroundColor('orangered')
            activationDispatch(activateIdentifyTool())
        }
        else{
            setBackgroundColor('orange')
            activationDispatch(activateIdentifyTool())
        }
        
    }
                                                                                                          
    return (
        <div data-testid='identify' className='identify' onClick={handleClick} style={{backgroundColor:backgroundColor}} onMouseEnter={()=>{changeDisplay('flex')}} onMouseLeave={()=>changeDisplay('none')}>
            <div className='identify-container'>
                <div className='identify-box'>
                    <div><i className='fa fa-info'></i></div>
                </div>
            </div>
            <ToolTip name='identify' display={display}/>
        </div>
    )
}
