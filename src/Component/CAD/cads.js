import React,{Fragment} from 'react'
import './styles/styles2.css'
import Cad_card from './cad_card.js'
import CAD from './cadViewer'
import {useState,useEffect} from 'react'


export default function CADS(props) {
    // setting up the view (Main view which holds all file types, and specific views for specific CAD(actual reading views)
    let [view,setView] = useState('CADS')
    
    // the cards here hold titles of the documents.
    let [CADDocs,SetCADDocs] = useState([])

    // holders for actual content coming from the backend.
    let [cad_content,setCADContent] = useState({}) // this will be sent to the cadViewer component.

    // this will load CAD from the backend for the main view.
    useEffect(()=>{
        fetch('http://localhost:8000/CAD/drawings/').then(res=>res.json()).then(
            data=>{
                SetCADDocs(data)
            }
            )  
    },[])


    // this will handle the submit of the search input
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    // here the click on a specific resource is handled, the actual click happens in a child component (words). 
    const handleClick=async (pk)=>{
        // filetype and pk are coming from a child (fileCard) inside child components (words,excel,pdf)
        // sending get request using the pk, in order to receive content which is sent to the word_file_page 
            await fetch(`http://localhost:8000/CAD/cad/${pk}/`).then(res=>res.json()).then(data=>{
            setCADContent(data)
            })
        
          
        // setting up the views (main view or one of the detail views)
        switch(view){
            case 'CADS':{setView('CADView')};break;  
        }
    
    }


    switch(view){
        case 'CADView':{
            return(<CAD title={cad_content.Title} url={cad_content.url}/>)
        };
        
        default:{
          let cads = CADDocs.map((item,index)=>{
            return(
              <Fragment key={index}>
              <Cad_card handleClick={handleClick} title={item.Title} url={item.url} pk={item.id} />
              </Fragment>
            )
            })
            return (
                <>
                    <div className='CAD'>
                        <div className='CAD-container' style={{display:props.CADContainerDisplay}} data-testid='CAD-container'>
                            <div className='CAD-side' style={{display:props.sidebarDisplay}} data-testid='CAD-side'></div>
                            <div className='CAD-main-area'>
                                <form onSubmit={handleSubmit} style={{display:props.formDisplay}} data-testid='CAD-form'>
                                <input name='search' placeholder='search..'/>
                                </form>
                                <div className='CAD-Cards-Holder'>
                                {cads}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        
        }
}
    }


    CADS.defaultProps={
        CADContainerDisplay:'grid',
        sidebarDisplay:'',
        formDisplay:''

    }