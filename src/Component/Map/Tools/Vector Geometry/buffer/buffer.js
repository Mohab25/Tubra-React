import React,{useState} from 'react'
import './styles/styles.css'
import BufferPane from './BufferPane'
import BufferParametersPane from './BufferParametersPane/BufferParametersPane'
export default function Buffer(props) {

    const [bufferPaneDisplay,toggleBufferPaneDisplay] = useState('none')

    const handleClick=(e)=>{
        bufferPaneDisplay==='none'?toggleBufferPaneDisplay('block'):toggleBufferPaneDisplay('none')
        props.activateBuffer()
    }

    return (
        <>
        <div className='buffer' style={{backgroundColor:bufferPaneDisplay=='none'?'orange':'orangered'}}>
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
        </>
    )
}
