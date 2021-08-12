import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import enableDisableCreateGeometry from '../../../../../Actions/GeometryCreation/enableCreateGeometry'
import './style/style2.css'

export default function SearchResultsHolder(props) {

// it's working but super ugly code.

    const [pointVectorOptionColor,setPointVectorOptionColor] = useState('orange')
    const [lineVectorOptionColor,setLineVectorOptionColor] = useState('orange')
    const [polygonVectorOptionColor,setPolygonVectorOptionColor] = useState('orange')

    // dispatchers 
    const EnableGeometryCreationDispatcher = useDispatch()

    // point creation
    const handlePointVectorClick=()=>{
        if(pointVectorOptionColor=='orange'){
            // disable (change the color of other tools), and hit the dispatch one time to balance thing up (this is mainly because to the reducer is implemented )
            setPolygonVectorOptionColor('orange');setLineVectorOptionColor('orange')

            setPointVectorOptionColor('orangered')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('point','enabled'))
        }
        else{
            setPointVectorOptionColor('orange')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('point','disabled'))
        }
        
    }

    // line creation
    const handleLineVectorClick=()=>{

        if(lineVectorOptionColor=='orange'){
            // disable (change the color of other tools), and hit the dispatch one time to balance thing up (this is mainly because to the reducer is implemented )
            setPointVectorOptionColor('orange');setPolygonVectorOptionColor('orange')

            setLineVectorOptionColor('orangered')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('line','enabled'))
        }
        else{
            setLineVectorOptionColor('orange')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('line','disabled'))
        }   
     }
    // polygon creation    
    const handlePolygonVectorClick=()=>{
        if(polygonVectorOptionColor=='orange'){
            // disable (change the color of other tools), and hit the dispatch one time to balance thing up (this is mainly because to the reducer is implemented )
            setPointVectorOptionColor('orange');setLineVectorOptionColor('orange')
          
            setPolygonVectorOptionColor('orangered')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('polygon','enabled'))
        }
        else{
            setPolygonVectorOptionColor('orange')
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('polygon','disabled'))
        }
    }

    useEffect(()=>{
        // handle when the user disable the vector creation main tool without clicking individual tools
        if(props.isVectorActivated==false){
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('point','disabled'))
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('line','disabled'))
            EnableGeometryCreationDispatcher(enableDisableCreateGeometry('polygon','disabled'))
            setPointVectorOptionColor('orange')
            setLineVectorOptionColor('orange')
            setPolygonVectorOptionColor('orange')
        
        }
    
    },[props.isVectorActivated])


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
