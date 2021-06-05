import React,{useState} from 'react'
import Files from '../../../Files/FilesHolder/Files'
import CAD from '../../../CAD/cads'
import WordDetailedView from "../../../Files/Word/word_file_page";
import ExcelDetailedView from "../../../Files/Excel/excel_page";
import PdfDetailedView from "../../../Files/Pdf/pdf_page";


export default function ModalFilesComponent(props) {

    let [view,setView] = useState('Main')


    // here the click on a specific resource is handled, the actual click happens in a child component (words). 
    const changeToDetailedView=async (filetype,pk)=>{
        switch(filetype){
            case 'word':{setView({file_view:'word',pk:pk})};break;  
            case 'excel':{setView({file_view:'excel',pk:pk})};break;  
            case 'pdf':{setView({file_view:'pdf',pk:pk})};break; // this can be changed to the view.  
        }
    
    }

    // the files with cards grabbed from the state.
    const ModalWordDocs = <Files fileType='word' changeToDetailedView={changeToDetailedView}/>
    const ModalExcelDocs = <Files fileType='excel' changeToDetailedView={changeToDetailedView}/>
    const ModalPdfDocs = <Files fileType='pdf' changeToDetailedView={changeToDetailedView}/>
    const CADModalFile = <CAD sidebarDisplay='none' formDisplay='none' CADContainerDisplay='block'/>
    

    switch(view.file_view){
        case 'word':{return(<WordDetailedView pk={view.pk}/>)}
        case 'excel':{return(<ExcelDetailedView pk={view.pk}/>)}
        case 'pdf':{return(<PdfDetailedView pk={view.pk}/>)}; 
        default:{
            return (
                <div style={{display:props.tabDisplay=='files'?'flex':'none'}}>
                    <h3 className='modal-entity-title'>{props.Category}{props.Pavement_Name}</h3>
                    {CADModalFile}
                    {ModalWordDocs}
                    {ModalExcelDocs}
                    {ModalPdfDocs}
                 </div>
            )
        }
    }            

}
