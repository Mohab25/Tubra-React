import React,{useState} from 'react'
import './styles/styles.css'

export default function Identify(props) {


    let [backgroundColor,setBackgroundColor] = useState('orange')

    let handleClick=()=>{
        if(backgroundColor=='orange'){
            setBackgroundColor('orangered')
        }
        else{
            setBackgroundColor('orange')
        }
        
    }

    return (
        <div className='identify' onClick={handleClick} style={{backgroundColor:backgroundColor}}>
            <div className='identify-container'>
                <div className='identify-box'>
                    <div><i className='fa fa-info'></i></div>
                </div>
            </div>
        </div>
    )
}
