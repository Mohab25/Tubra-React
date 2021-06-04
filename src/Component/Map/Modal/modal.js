import React,{useEffect,useState} from 'react'
import Files from '../../Files/FilesHolder/Files'
import CAD from '../../CAD/cads'
import AerodromeComponentDetails from './AerodromeComponentDetails/AerodromeComponentDetails.js'
import L from 'leaflet'
import './styles.css'
import {handleHorizontalScroll} from './helper functions/scroll'


export default function Modal(props) {
    let [tabDisplay,setTabDisplay] = useState('component')
    // the files with cards grabbed from the state.
    const ModalWordDocs = <Files fileType='word'/>
    const ModalExcelDocs = <Files fileType='excel'/>
    const ModalPdfDocs = <Files fileType='pdf'/>
    const CADModalFile = <CAD sidebarDisplay='none' formDisplay='none' CADContainerDisplay='block'/>
    
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
        <div className='backdrop' onClick={closeModal} onMouseEnter={preventMapActions} >
            <div className='modal-inner-holer' onWheelCapture={preventMapActions}>
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
                    <i className='fa fa-expand fa-lg'></i>
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
