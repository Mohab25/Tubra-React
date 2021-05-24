import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import enableDisableCreateGeometry from '../../../../../Actions/GeometryCreation/enableCreateGeometry'
import './style/style2.css'

export default function SearchResultsHolder(props) {

// it's working but super ugly code.

    const [pointVectorOptionColor,setPointVectorOptionColor] = useState('orange')
    const [lineVectorOptionColor,setLineVectorOptionColor] = useState('orange')
    const [polygonVectorOptionColor,setPolygonVectorOptionColor] = useState('orange')
    const [pointerStyle,setPointerStyle] = useState('cursor')
    // dispatchers 
    const EnableGeometryCreationDispatcher = useDispatch()

    // point creation
    const handlePointVectorClick=()=>{
        if(pointVectorOptionColor=='orange'){
            setPointVectorOptionColor('orangered')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('point'))
        }
        else{
            setPointVectorOptionColor('orange')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('point'))
        }
        
    }
    document.body.style.cursor=pointerStyle
    // line creation
    const handleLineVectorClick=()=>{

        if(lineVectorOptionColor=='orange'){
            setLineVectorOptionColor('orangered')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('line'))
        }
        else{
            setLineVectorOptionColor('orange')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('line'))
        }   
     }
    // polygon creation    
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
