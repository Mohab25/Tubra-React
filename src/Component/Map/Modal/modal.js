import React,{useEffect, useState, useRef} from 'react'
import Files from '../../Files/FilesHolder/Files'
import CAD from '../../CAD/cads'
import AerodromeComponentDetails from './AerodromeComponentDetails/AerodromeComponentDetails.js'
import './styles.css'
import {handleHorizontalScroll} from './helper functions/scroll'


export default function Modal(props) {
    let [tabDisplay,setTabDisplay] = useState('component')
    
    // the files with cards grabbed from the state.
    const ModalWordDocs = <Files fileType='word'/>
    const ModalExcelDocs = <Files fileType='excel'/>
    const ModalPdfDocs = <Files fileType='pdf'/>
    const CADModalFile = <CAD sidebarDisplay='none' formDisplay='none' CADContainerDisplay='block'/>
    
    // inner holder enlarge/minimize values
    let backdropRef = useRef()
    let innerHolderRef = useRef()
    const [initialExpandValue,setInitialExpandValue] = useState()
    const [isExpanded,setExpansion] = useState('minimized') 

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

    // expand and minimize inner holder 
    let handleDimensions=()=>{
        if(isExpanded=='minimized'){
            innerHolderRef.current.style.width = '100%'
            innerHolderRef.current.style.height = '100%'
            innerHolderRef.current.style.margin='0px'
            setExpansion('expanded')
        }
        else{
            innerHolderRef.current.style.width = `${initialExpandValue.width}px`
            innerHolderRef.current.style.height = `${initialExpandValue.height}px`
            innerHolderRef.current.style.margin='60px auto'
            setExpansion('minimized')
        }
    }


    useEffect(()=>{
        if(innerHolderRef!=undefined){
            let innerHolderWidth = innerHolderRef.current.clientWidth
            let innerHolderHeight = innerHolderRef.current.clientHeight
            setInitialExpandValue({width:innerHolderWidth,height:innerHolderHeight})}
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
                <div style={{display:tabDisplay=='files'?'flex':'none'}}>
                    <h3 className='modal-entity-title'>{props.data.Category}{props.data.Pavement_Name}</h3>
                    {CADModalFile}
                    {ModalWordDocs}
                    {ModalExcelDocs}
                    {ModalPdfDocs}
                </div>
                <div className='modal-enlarge-screen-icon'>
                    <i className='fa fa-expand fa-lg' onClick={handleDimensions}></i>
                </div>

                <div className='modal-right-arrow'>
                    <i className='fas fa-arrow-alt-circle-right fa-2x'></i>
                </div>
                <div className='modal-left-arrow'>
                    <i className='fas fa-arrow-alt-circle-left fa-2x'></i>
                </div>

            </div>
        </div>
    )
}
