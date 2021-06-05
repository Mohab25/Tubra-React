import React,{useEffect, useState, useRef} from 'react'
import AerodromeComponentDetails from './AerodromeComponentDetails/AerodromeComponentDetails.js'
import ModalButtons from "./ModalButtons/ModalButtons";
import ModalFilesComponent from "./ModalFilesComponent/ModalFilesComponent";
import './styles.css'
import {handleHorizontalScroll} from './helper functions/scroll'

export default function Modal(props) {
    let [tabDisplay,setTabDisplay] = useState('component')
    
    // inner holder enlarge/minimize values
    let backdropRef = useRef()
    let innerHolderRef = useRef()

    const closeModal=(e)=>{
        if(e.target.classList.contains('backdrop')){
            props.modalCloser(null)
            props.map.dragging.enable();    
            props.map.scrollWheelZoom.enable();
        }
    }

    let toggleTabDisplay=(tab)=>{
        setTabDisplay(tab)
    }

    let preventMapActions=(e)=>{
        e.stopPropagation()
        props.map.dragging.disable();    
        props.map.scrollWheelZoom.disable();
        console.log('propagated')
    }

    useEffect(()=>{
        handleHorizontalScroll()
    },[])

    return (
        <div className='backdrop' ref={backdropRef} onClick={closeModal} onMouseEnter={preventMapActions} >
            <div className='modal-inner-holer' ref={innerHolderRef} onWheelCapture={preventMapActions}>
                <div className='tabs'>
                    <div className='tab' onClick={()=>toggleTabDisplay('component')}>Component</div>
                    <div className='tab' onClick={()=>toggleTabDisplay('annex')}>Annex</div>
                    <div className='tab' onClick={()=>toggleTabDisplay('files')}>Files</div>
                </div>
                <div style={{display:tabDisplay=='component'?'flex':'none'}}><AerodromeComponentDetails/></div>
                <ModalFilesComponent tabDisplay={tabDisplay} Category={props.data.Category} Pavement_Name={props.data.Pavement_Name}/>
                <ModalButtons innerHolderRef={innerHolderRef} />
            </div>
        </div>
    )
}
