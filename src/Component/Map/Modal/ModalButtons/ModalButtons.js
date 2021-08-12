import React,{useState,useEffect} from 'react'
import {handleDimensions} from '../helper functions/expandMinimize'
import './styles.css'

export default function ModalButtons({innerHolderRef,view}) {

    const [initialExpandValue,setInitialExpandValue] = useState()
    const [isExpanded,setExpansion] = useState('minimized') 

    const [ButtonsPosition,setEnlargeButtonsPosition] = useState({enlargeTop:'15%',enlargeRight:'16%',leftArrowLeft:'16%',rightArrowRight:'15%'})

    useEffect(()=>{
        if(innerHolderRef!=undefined){
            let innerHolderWidth = innerHolderRef.current.clientWidth
            let innerHolderHeight = innerHolderRef.current.clientHeight
            setInitialExpandValue({width:innerHolderWidth,height:innerHolderHeight})}
    },[])


    return (
        <div>
            <div className='modal-enlarge-screen-icon' style={{top:ButtonsPosition.enlargeTop,right:ButtonsPosition.enlargeRight}}>
                <i className='fa fa-expand fa-lg' onClick={()=>{handleDimensions(isExpanded,innerHolderRef,setExpansion,initialExpandValue,setEnlargeButtonsPosition)}}></i>
                </div>
                <div className='modal-right-arrow' style={{display:view.file_view!='Main'?'none':'block',right:ButtonsPosition.rightArrowRight}}>
                    <i className='fas fa-arrow-alt-circle-right fa-2x'></i>
                </div>
                <div className='modal-left-arrow' style={{display:view.file_view!='Main'?'none':'block',left:ButtonsPosition.leftArrowLeft}}>
                    <i className='fas fa-arrow-alt-circle-left fa-2x'></i>
                </div>
        </div>
    )
}
