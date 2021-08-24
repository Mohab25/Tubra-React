import React,{useEffect, useState} from 'react'
import Files from '../../../Files/FilesHolder/Files'
import CAD from '../../../CAD/cads'
import WordDetailedView from "../../../Files/Word/word_file_page";
import ExcelDetailedView from "../../../Files/Excel/excel_page";
import PdfDetailedView from "../../../Files/Pdf/pdf_page";
import CADDetailedView from '../../../CAD/cadViewer'

export default function ModalFilesComponent(props) {

    // here the click on a specific resource is handled, the actual click happens in a child component (words). 
    const changeToDetailedView=async (filetype,pk)=>{
        switch(filetype){
            case 'word':{props.setView({file_view:'word',pk:pk})};break;  
            case 'excel':{props.setView({file_view:'excel',pk:pk})};break;  
            case 'pdf':{props.setView({file_view:'pdf',pk:pk})};break; // this can be changed to the view.  
        }
        let backIcon = <i className='fa fa-long-arrow-left fa-2x '> </i>
        props.setFilesTab({text:backIcon,bgColor:'#0275d8',color:'white'})
    }

    const modalCadHandle=(url)=>{
        props.setView({file_view:'cad'})
        props.setCADView(url)
    }


    // the files with cards grabbed from the state.
    // const ModalWordDocs = <Files fileType='word' changeToDetailedView={changeToDetailedView}/>
    // const ModalExcelDocs = <Files fileType='excel' changeToDetailedView={changeToDetailedView}/>
    // const ModalPdfDocs = <Files fileType='pdf' changeToDetailedView={changeToDetailedView}/>
    
    const ModalDocs = <Files changeToDetailedView={changeToDetailedView}/>
    const CADModalFile = <CAD sidebarDisplay='none' formDisplay='none' CADContainerDisplay='block' modalCadHandle={modalCadHandle}/>

    switch(props.view.file_view){
        case 'word':{return(<WordDetailedView pk={props.view.pk} currentTab={props.tabDisplay}/>)}
        case 'excel':{return(<ExcelDetailedView pk={props.view.pk}/>)}
        case 'pdf':{return(<PdfDetailedView pk={props.view.pk}/>)};  
        case 'cad':{return(<CADDetailedView url={props.cadView}/>)};  
    
        default:{
            return (
                <div data-testid='docsModal-container' style={{display:props.tabDisplay=='files'?'flex':'none'}}>
                    <h3 className='modal-entity-title'>{props.data.Name}</h3>
                    {CADModalFile}
                    {ModalDocs}
                 </div>
            )
        }
    }            

}
