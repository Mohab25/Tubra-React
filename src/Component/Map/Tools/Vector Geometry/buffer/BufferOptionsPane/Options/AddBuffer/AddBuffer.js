import React,{useEffect,useRef} from 'react'
import './styles.css'
import {useDispatch} from 'react-redux'
import changeBufferDistance from '../../../../../../../../Actions/GeometryCreation/BufferDistance'

export default function AddBuffer(props) {
    let inputRef = useRef(null)
    let dispatch = useDispatch()

    useEffect(()=>{
        inputRef.current.focus()
    },[props.display]) // if this empty it won't work because the mounting happens before the display is changed from none to block, even before the buffer is activated. 


    let handleChange=(e)=>{
        dispatch(changeBufferDistance(e.target.value))
    }

    return (
        <div className='addBufferOption' style={{display:props.display}}>
            <p>Distance:</p>
            <input name='bufferDistance' type='number' ref={inputRef} onChange={handleChange}/>
            <p>Meters</p>
        </div>
    )
}
