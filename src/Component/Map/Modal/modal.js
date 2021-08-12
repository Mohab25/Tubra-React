import React,{useEffect, useState, useRef} from 'react'
import AerodromeComponentDetails from './AerodromeComponentDetails/AerodromeComponentDetails.js'
import AnnexExcerpts from './Annexes Excerpts/AnnexesExcerpts'
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

    // shared state between child files modal and other buttons
    let [view,setView] = useState({file_view:'Main'})

    // changing files tab according to weather the user on detailed of general files view
    let [filesTab,setFilesTab]=useState({text:'Files',bgColor:'none',color:'black'})
    
    
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
        if(tab=='files'){
            if(view.file_view!=='Main'){
                setView({file_view:'Main'})
                setFilesTab({text:'Files',bgColor:'white',color:'black'})
            }
            else{
                setTabDisplay(tab) 
            }
        }
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
                    <div className='tab' style={{backgroundColor:filesTab.bgColor,color:filesTab.color}} onClick={()=>toggleTabDisplay('files')}>{filesTab.text}</div>
                </div>
                <div data-testid='component-tab' style={{display:tabDisplay=='component'?'flex':'none'}}><AerodromeComponentDetails  textual_data={textual_data}/></div>
                <div data-testid='annex-tab' style={{display:tabDisplay=='annex'?'flex':'none'}}><AnnexExcerpts  textual_data={textual_data}/></div>
                <div data-testid='files-tab' style={{display:tabDisplay=='files'?'flex':'none'}}><ModalFilesComponent tabDisplay={tabDisplay} Category={props.data.Category} Pavement_Name={props.data.Pavement_Name} setView={setView} view={view} setFilesTab={setFilesTab}/></div>
                <ModalButtons innerHolderRef={innerHolderRef} currentDisplay={tabDisplay} view={view}/>
            </div>
        </div>
    )
}

