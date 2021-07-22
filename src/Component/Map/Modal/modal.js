import React,{useEffect, useState, useRef} from 'react'
import AerodromeComponentDetails from './AerodromeComponentDetails/AerodromeComponentDetails.js'
import ModalButtons from "./ModalButtons/ModalButtons";
import ModalFilesComponent from "./ModalFilesComponent/ModalFilesComponent";
import './styles.css'
import {handleHorizontalScroll} from './helper functions/scroll'
import textual_data from './AerodromeComponentDetails/assets/Textual.json'

export default function Modal(props) {
    let [tabDisplay,setTabDisplay] = useState('component')
    
    // inner holder enlarge/minimize values
    let backdropRef = useRef()
    let innerHolderRef = useRef()

    const closeModal=(e)=>{
        if(e.target.classList.contains('backdrop')){
            props.modalCloser(null)
            if(props.map!=undefined){
            props.map.dragging.enable();    
            props.map.scrollWheelZoom.enable();
            }
        }
    }

    let toggleTabDisplay=(tab)=>{
        setTabDisplay(tab)
    }

    let preventMapActions=(e)=>{
        if(props.map!=undefined){
        e.stopPropagation()
        props.map.dragging.disable();    
        props.map.scrollWheelZoom.disable();
        
    }
    }

    useEffect(()=>{
        handleHorizontalScroll()
    },[])

    return (
        <div className='backdrop' data-testid='backdrop' ref={backdropRef} onClick={closeModal} onMouseEnter={preventMapActions} >
            <div className='modal-inner-holer' ref={innerHolderRef} onWheelCapture={preventMapActions}>
                <div className='tabs'>
                    <div className='tab' onClick={()=>toggleTabDisplay('component')}>Component</div>
                    <div className='tab' onClick={()=>toggleTabDisplay('annex')}>Annex</div>
                    <div className='tab' onClick={()=>toggleTabDisplay('files')}>Files</div>
                </div>
                <div data-testid='component-tab' style={{display:tabDisplay=='component'?'flex':'none'}}><AerodromeComponentDetails  textual_data={textual_data}/></div>
                <div data-testid='files-tab' style={{display:tabDisplay=='files'?'flex':'none'}}><ModalFilesComponent tabDisplay={tabDisplay} Category={props.data.Category} Pavement_Name={props.data.Pavement_Name}/></div>
                <ModalButtons innerHolderRef={innerHolderRef} />
            </div>
        </div>
    )
}

