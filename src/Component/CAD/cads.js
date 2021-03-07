import React,{Fragment} from 'react'
import './styles/styles2.css'
import Cad_card from './cad_card.js'
import CAD from './cad.js'
import {useState,useEffect} from 'react'


export default function CADS() {
    // setting up the view (Main view which holds all file types, and specific views for specific CAD(actual reading views))
    let [view,setView] = useState('CADS')
    
    // holders for actual content coming from the backend.
    let [cad_content,setCADContent] = useState({}) // this will be sent to the word_page component.
    // the cards here hold titles of the documents.
    let [CADDocs,SetCADDocs] = useState([])
    // this will load CAD from the backend for the main view.
    useEffect(()=>{
        fetch('http://localhost:8000/CAD/drawings/').then(res=>res.json()).then(
            data=>{
                console.log(data)
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
            case 'CADS':{setView('CAD')};break;  
        }
    
    }


    switch(view){
        case 'CAD':{console.log(cad_content);return(<CAD title={cad_content.Title} url={cad_content.url}/>)};
        
        default:{
          let cads = CADDocs.map((item,index)=>{
            return(
              <Fragment key={index}>
              <Cad_card handleClick={handleClick} title={item.Title} url={item.url} pk={item.id}/>
              </Fragment>
            )
          })
            return (
                <>
                    <div className='CAD'>
                        <div className='CAD-container'>
                            <div className='CAD-side'></div>
                            <div className='CAD-main-area'>
                                <form onSubmit={handleSubmit}>
                                <input name='search' placeholder='search..'/>
                                </form>
                                <div className='CAD-Cards-Holder'>
                                {cads}
                                </div>
                            </div>
                        </div>
                        <p style={{marginTop:'250px',marginLeft:'250px'}}>CAD</p>
                    </div>
                </>
            )
        
        }
}
    }
