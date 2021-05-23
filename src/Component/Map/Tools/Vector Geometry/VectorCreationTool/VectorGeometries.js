import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import enableDisableCreateGeometry from '../../../../../Actions/GeometryCreation/enableCreateGeometry'
import './style/style2.css'

export default function SearchResultsHolder(props) {

// it's working but super ugly code.

    const [pointVectorOptionColor,setPointVectorOptionColor] = useState('orange')
    const [lineVectorOptionColor,setLineVectorOptionColor] = useState('orange')
    const [polygonVectorOptionColor,setPolygonVectorOptionColor] = useState('orange')
    const [itemVectorOptionColor,setItemVectorOptionColor] = useState('orange')
    const [pointerStyle,setPointerStyle] = useState('cursor')
    // dispatchers 
    const EnableGeometryCreationDispatcher = useDispatch()


    const handlePointVectorClick=()=>{
        pointVectorOptionColor=='orange'?setPointVectorOptionColor('orangered'):setPointVectorOptionColor('orange')
        pointerStyle=='crosshair'?setPointerStyle('default'):setPointerStyle('crosshair')
    }
    document.body.style.cursor=pointerStyle

    const handleLineVectorClick=()=>{
        if(lineVectorOptionColor=='orange'){
            setPolygonVectorOptionColor('orangered')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('line'))
        }
        else{
            setPolygonVectorOptionColor('orange')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('line'))
        }    }
    const handlePolygonVectorClick=()=>{
        if(polygonVectorOptionColor=='orange'){
            setPolygonVectorOptionColor('orangered')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('polygon'))
        }
        else{
            setPolygonVectorOptionColor('orange')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('polygon'))
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
