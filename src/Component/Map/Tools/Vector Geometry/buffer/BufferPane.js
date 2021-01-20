import React,{useState,useEffect} from 'react'
import './styles/styles2.css'
import route_icon from './icons_images/route.png'

export default function SearchResultsHolder(props) {

// it's working but super ugly code.

    const [pointBufferOptionColor,setPointBufferOptionColor] = useState('orange')
    const [lineBufferOptionColor,setLineBufferOptionColor] = useState('orange')
    const [polygonBufferOptionColor,setPolygonBufferOptionColor] = useState('orange')
    const [itemBufferOptionColor,setItemBufferOptionColor] = useState('orange')

    const handlePointBufferClick=()=>{
        pointBufferOptionColor=='orange'?setPointBufferOptionColor('orangered'):setPointBufferOptionColor('orange')
        document.body.style.cursor='crosshair';
    }
    const handleLineBufferClick=()=>{
        lineBufferOptionColor=='orange'?setLineBufferOptionColor('orangered'):setLineBufferOptionColor('orange')
    }
    const handlePolygonBufferClick=()=>{
        polygonBufferOptionColor=='orange'?setPolygonBufferOptionColor('orangered'):setPolygonBufferOptionColor('orange')
    }

    const handleItemBufferClick=()=>{
        itemBufferOptionColor=='orange'?setItemBufferOptionColor('orangered'):setItemBufferOptionColor('orange')
    }
    return (
        <div className='BufferPane'>
            <div className='BufferPane-container'>
                <div className='buffer-options-holder' style={{display:props.display}}>
                    <div className='buffer-options-container'>
                    <div className='buffer-option' onClick={handlePointBufferClick} style={{backgroundColor:pointBufferOptionColor}}>
                            <div className='point-buffer-image'>
                            <i className='fas fa-circle'></i>
                            </div>
                        </div>
                        <div className='buffer-option' onClick={handleLineBufferClick} style={{backgroundColor:lineBufferOptionColor}}>
                            <div className='line-buffer-image' style={{background:`url(${route_icon})`}}></div>
                        </div>
                        <div className='buffer-option' onClick={handlePolygonBufferClick} style={{backgroundColor:polygonBufferOptionColor}}>
                            <div className='polygon-buffer-image'>
                            <i className='far fa-square square'></i>
                            </div>
                        </div>
                        <div className='buffer-option' onClick={handleItemBufferClick} style={{backgroundColor:itemBufferOptionColor}}>
                            <div className='polygon-buffer-image'>
                            <i className='far fa-square square'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
