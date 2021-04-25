import React,{useEffect,useRef} from 'react'
import './styles.css'

export default function AddBuffer(props) {
    let inputRef = useRef(null)

    useEffect(()=>{
        console.log(inputRef.current)
        inputRef.current.focus()
    },[props.display]) // if this empty it won't work because the mounting happens before the display is changed from none to block, even before the buffer is activated. 

    return (
        <div className='addBufferOption' style={{display:props.display}}>
            <p>Distance:</p>
            <input name='bufferDistance' type='number' ref={inputRef}/>
            <p>Meters</p>
        </div>
    )
}
