import React,{useState}  from 'react'
import './styles/styles.css'
import File from './FilesHolder/Files.js'
import WordDoc from './Word/word_file_page'
import ExcelDoc from './Excel/excel_page'
import PdfDoc from './Pdf/pdf_page'

export default function Files() {
    // setting up the view (Main view which holds all file types, and specific views for specific files(actual reading views))
    let [view,setView] = useState('Main')

    // here the click on a specific resource is handled, the actual click happens in a child component (words). 
    const changeToDetailedView=async (filetype,pk)=>{
        switch(filetype){
            case 'word':{setView({file_view:'word',pk:pk})};break;  
            case 'excel':{setView({file_view:'excel',pk:pk})};break;  
            case 'pdf':{setView({file_view:'pdf',pk:pk})};break; // this can be changed to the view.  
        }
    
    }

    let files = ['word','excel','pdf'].map(item=>{
        return(<File fileType={item} changeToDetailedView={changeToDetailedView}/>)
    })

    switch(view.file_view){
        case 'word':{return(<WordDoc pk={view.pk}/>)}
        case 'excel':{return(<ExcelDoc pk={view.pk}/>)}
        case 'pdf':{return(<PdfDoc pk={view.pk}/>)}; 
        default:{
            return (
            <>
            <div className='files'>
                <div className='files-container'>
                    <div className='files-side'></div>
                    <div className='files-main-area'>
                        {files}
                    </div>
                </div>
            </div>
            </>
            )}
        }
    }
