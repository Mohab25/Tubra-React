import React,{useEffect, useState}  from 'react'
import { useSelector } from "react-redux";
import './styles/styles.css'
import File from './FilesHolder/Files.js'
import WordDoc from './Word/word_file_page'
import ExcelDoc from './Excel/excel_page'
import PdfDoc from './Pdf/pdf_page'
import SearchBar from "./searchBar/searchBar";



export default function Files() {
    // setting up the view (Main view which holds all file types, and specific views for specific files(actual reading views))
    let [view,setView] = useState('Main')
    // the files
    let [files,setFiles] = useState([])
    // initial files
    let [initialFiles,setInitialFiles] = useState([]) 
    // filter from SearchBar
    let [filtered,filter] = useState([])
    let [promises,setAllPromises] = useState([])
    // here the click on a specific resource is handled, the actual click happens in a child component (words). 
    const changeToDetailedView=async (filetype,pk)=>{
        switch(filetype){
            case 'word':{setView({file_view:'word',pk:pk})};break;  
            case 'excel':{setView({file_view:'excel',pk:pk})};break;  
            case 'pdf':{setView({file_view:'pdf',pk:pk})};break; // this can be changed to the view.  
        }
    
    }

    let AsyncFunc= async ()=>{
        let first_res =  await Promise.all(
                ['word','excel','pdf'].map((item,index)=>{
                return(
                <File key={index} fileType={item} changeToDetailedView={changeToDetailedView}/>
                )
            })).then(vals=>vals).then(data=>setAllPromises(data))
    }

    useEffect(()=>{
        AsyncFunc()
    },[])

    useEffect(()=>{
        setFiles(promises)
        setInitialFiles(promises)
    },[promises])

    useEffect(()=>{
        if(initialFiles!=undefined){
        if(initialFiles.length!=0)
        {
            if(filtered.length!=0){
            let word_files = [], excel_files = [], pdf_files = [];
            filtered.map((item,index)=>{
                if(item.Document_type.Doc_type=='Word'){word_files.push(item)}
            })
            filtered.map((item,index)=>{
                if(item.Document_type.Doc_type=='Excel'){excel_files.push(item)}
            })
            filtered.map((item,index)=>{
                if(item.Document_type.Doc_type=='PDF'){pdf_files.push(item)}
            })
            
            let returned_word_files = <File preloaded={true} preloadedData={word_files} changeToDetailedView={changeToDetailedView} fileType='word'/> 
            let returned_excel_files = <File preloaded={true} preloadedData={excel_files} changeToDetailedView={changeToDetailedView} fileType='excel'/> 
            let returned_pdf_files = <File preloaded={true} preloadedData={pdf_files} changeToDetailedView={changeToDetailedView} fileType='pdf'/> 
            let returned_files_all = [returned_word_files, returned_excel_files, returned_pdf_files]
        
            setFiles(returned_files_all)

            }
                
        
        else{
            setFiles(initialFiles)
        }
    }
    }

    },[filtered])

    switch(view.file_view){
        case 'word':{return(<WordDoc pk={view.pk} changeView={setView}/>)}
        case 'excel':{return(<ExcelDoc pk={view.pk} changeView={setView}/>)}
        case 'pdf':{return(<PdfDoc pk={view.pk}/>)}; 
        default:{
            
            if(files!=undefined){
            return (
                <>
                <div className='files'>
                    <SearchBar filter={filter}/>
                    <div className='files-container'>
                        <div className='files-side'></div>
                        <div className='files-main-area'>
                            {files.map((item,index)=>{return item})}
                        </div>
                    </div>
                </div>
                </>
                    )
    }
    else{
        return <div></div>
    }
}
        
    }
    }
