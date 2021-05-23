import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import enableDisableCreatePolygon from '../../../../../Actions/GeometryCreation/Polygon/enableCreatePolygon'
import './style/style2.css'

export default function SearchResultsHolder(props) {

// it's working but super ugly code.

    const [pointVectorOptionColor,setPointVectorOptionColor] = useState('orange')
    const [lineVectorOptionColor,setLineVectorOptionColor] = useState('orange')
    const [polygonVectorOptionColor,setPolygonVectorOptionColor] = useState('orange')
    const [itemVectorOptionColor,setItemVectorOptionColor] = useState('orange')
    const [pointerStyle,setPointerStyle] = useState('cursor')
    // dispatchers 
    const EnablePolygonCreationDispatcher = useDispatch()


    const handlePointVectorClick=()=>{
        pointVectorOptionColor=='orange'?setPointVectorOptionColor('orangered'):setPointVectorOptionColor('orange')
        pointerStyle=='crosshair'?setPointerStyle('default'):setPointerStyle('crosshair')
    }
    document.body.style.cursor=pointerStyle

    const handleLineVectorClick=()=>{
        lineVectorOptionColor=='orange'?setLineVectorOptionColor('orangered'):setLineVectorOptionColor('orange')
    }
    const handlePolygonVectorClick=()=>{
        if(polygonVectorOptionColor=='orange'){
            setPolygonVectorOptionColor('orangered')
            EnablePolygonCreationDispatcher(enableDisableCreatePolygon())
        }
        else{
            setPolygonVectorOptionColor('orange')
            EnablePolygonCreationDispatcher(enableDisableCreatePolygon())
        }
    }

    const handleItemVectorClick=()=>{
        itemVectorOptionColor=='orange'?setItemVectorOptionColor('orangered'):setItemVectorOptionColor('orange')
    }
    return (
        <div className='VectorPane'>
            <div className='VectorPane-container'>
                <div className='Vector-options-holder' style={{display:props.display}}>
                    <div className='Vector-options-container'>
                    <div className='Vector-option' onClick={handlePointVectorClick} style={{backgroundColor:pointVectorOptionColor}}>
                            <div className='point-Vector-image'>
                            <i className='fas fa-circle'></i>
                            </div>
                        </div>
                        <div className='Vector-option' onClick={handleLineVectorClick} style={{backgroundColor:lineVectorOptionColor}}>
                            <div className='line-Vector-image'>
                            </div>
                        </div>
                        <div className='Vector-option' onClick={handlePolygonVectorClick} style={{backgroundColor:polygonVectorOptionColor}}>
                            <div className='polygon-Vector-image'>
                            <i className='fas fa-draw-polygon'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
