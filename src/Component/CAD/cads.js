import React,{Fragment} from 'react'
import {useSelector} from 'react-redux'
import './styles/styles2.css'
import Cad_card from './cad_card.js'
import CAD from './cadViewer'
import {useState,useEffect} from 'react'
import RunwayFilters from './SidebarContents/RunwayFilters/RunwayFilters';
import TaxiwayFilters from './SidebarContents/TaxiwayFilters/TaxiwayFilters';
import ApronFilters from './SidebarContents/ApronFilters/ApronFilters';
import GeneralFilters from './SidebarContents/GeneralFilters/GeneralFilters';
import DrainageFilters from './SidebarContents/DrainageFilters/DrainageFilters';

export default function CADS(props) {
    // setting up the view (Main view which holds all file types, and specific views for specific CAD(actual reading views)
    let [view,setView] = useState('CADS')
    
    // the cards here hold titles of the documents.
    let [CADDocs,SetCADDocs] = useState([])

    // holders for actual content coming from the backend.
    let [cad_content,setCADContent] = useState({}) // this will be sent to the cadViewer component.

    let aerodrome_part = useSelector(state => state.FilterTypeChangeReducer.aerodrome_part)    
    let filter_type = useSelector(state => state.FilterTypeChangeReducer.filterType)    

    // this will load CAD from the backend for the main view.
    useEffect(()=>{
        let url;
        switch(aerodrome_part){ //http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com
            case 'Runway':{ 
             switch(filter_type){   
                case 'Runway Layouts': url= 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_runway_layouts/'; break; 
                case 'Runway Marking': url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_runway_markings/'; break; 
                case 'Runway Profiles':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_runway_profiles/';break; 
                case 'Runway X-Sections':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_runway_cross_sections/';break; 
                case 'General':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_runway_general/';break; 
             }
                break;
            }

            case 'Taxiway':{ 
                switch(filter_type){   
                    case 'Taxiway Layouts': url= 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_taxiway_layouts/'; break; 
                    case 'Taxiway Marking': url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_taxiway_markings/'; break; 
                    case 'Taxiway Profiles':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_taxiway_profiles/';break; 
                    case 'Taxiway X-Sections':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_taxiway_cross_sections/';break; 
                    case 'General':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_taxiway_general/';break;  
                }
                   break;
               }

            case 'Apron':{ 
            switch(filter_type){   
                case 'Apron Layouts': url= 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_apron_layouts/'; break; 
                case 'Apron Marking': url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_apron_markings/'; break; 
                case 'Apron Profiles':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_apron_profiles/';break; 
                case 'Apron X-Sections':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_apron_cross_sections/';break; 
                case 'General':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_apron_general/';break; }
                break;
            }

            case 'General':{ 
                    url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_aerodrome_general/';
                    break;
                }

            case 'Drainage':{ 
                switch(filter_type){   
                    case 'Drainage Layouts': url= 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_drainage_layouts/'; break; 
                    case 'Drainage Marking': url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_drainage_markings/'; break; 
                    case 'Drainage Profiles':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_drainage_profiles/';break; 
                    case 'Drainage X-Sections':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_drainage_cross_sections/';break; 
                    case 'General':url = 'http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/obeid_drainage_general/';break;
                    }
                    break;
                }


        }

    fetch(url).then(res=>res.json()).then(data=>SetCADDocs(data))
    },[aerodrome_part,filter_type])

    // this will handle the submit of the search input
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    // here the click on a specific resource is handled, the actual click happens in a child component (words). 
    const handleClick=async (pk)=>{
        // filetype and pk are coming from a child (fileCard) inside child components (words,excel,pdf)
        // sending get request using the pk, in order to receive content which is sent to the word_file_page 
  
        await fetch(`http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/CAD/drawing/${pk}/`).then(res=>res.json()).then(data=>{
            setCADContent(data);
            })
        
          
        // setting up the views (main view or one of the detail views)
        switch(view){
            case 'CADS':{setView('CADView')};break;  
        }
    
    }

    switch(view){
        case 'CADView':{
            // something wrong with django serving media images -- needs check
            let the_url = ''
            if(cad_content.CAD_file.includes('localhost')){
                let name = cad_content.Title.replace('Aerodrome ','')
                let ext = cad_content.CAD_file.includes('.jpg')?".jpg":".png"
                let file_name = name+ext
                the_url='http://ec2-18-118-61-96.us-east-2.compute.amazonaws.com/media/CAD/'+file_name
            }
            else {the_url = cad_content.CAD_file.replace('ec2-18-118-61-96.us-east-2.compute.amazonaws','tubra')}  
            console.log('cad url:',the_url)
            //props.modalCadHandle(the_url)
            return(<CAD title={cad_content.Title} url={the_url} changeView={setView}/>)
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
                            <div className='CAD-side' style={{display:props.sidebarDisplay}} data-testid='CAD-side'>
                                <RunwayFilters/>
                                <TaxiwayFilters/>
                                <ApronFilters/>
                                <GeneralFilters/>
                                <DrainageFilters/>
                            </div>
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