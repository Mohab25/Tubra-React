import React,{useEffect,useState} from 'react'
import Files from '../../Files/FilesHolder/Files'
import CAD from '../../CAD/cads'
import AerodromeComponentDetails from './AerodromeComponentDetails/AerodromeComponentDetails.js'

import './styles.css'

export default function Modal(props) {
    let [tabDisplay,setTabDisplay] = useState('component')
    // the files with cards grabbed from the state.
    const ModalWordDocs = <Files fileType='word'/>
    const ModalExcelDocs = <Files fileType='excel'/>
    const ModalPdfDocs = <Files fileType='pdf'/>
    const CADModalFile = <CAD sidebarDisplay='none' formDisplay='none' CADContainerDisplay='block'/>
    
    const closeModal=(e)=>{
        if(e.target.classList.contains('backdrop')){props.modalCloser(null)}
    }

    let toggleTabDisplay=(tab)=>{
        setTabDisplay(tab)
    }

    return (
        <div className='backdrop' onClick={closeModal}>
            <div className='modal-inner-holer'>
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
            </div>
        </div>
    )
}
