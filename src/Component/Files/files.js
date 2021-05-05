import React from 'react'
import './styles/styles.css'
import Word from './Word/word.js'
import WordDoc from './Word/word_file_page'
import Excel from './Excel/excel.js'
import ExcelDoc from './Excel/excel_page'
import Pdf from './Pdf/pdf.js'
import PdfDoc from './Pdf/pdf_page'
import {useState,useEffect} from 'react'


export default function Files() {
    // setting up the view (Main view which holds all file types, and specific views for specific files(actual reading views))
    let [view,setView] = useState('Main')
    
    // holders for actual content coming from the backend.
    let [word_content,setWordContent] = useState({}) // this will be sent to the word_page component.
    let [excel_content,setExcelContent] = useState({})
    let [pdf_content,setPdfContent] = useState({})
    // the cards here hold titles of the documents.
    let [wordDocs,SetWordDocs] = useState([])
    let [excelDocs,SetExcelDocs] = useState([])
    let [pdfDocs,SetPdfDocs] = useState([])
    
    // this will handle the dynamic filtering.
    const handleChange=async (e)=>{
        let matches = [] 
        // fetch. filter the response with regex, set state with the title of the filtered elem. 
            // let regx = new RegExp(`${e.target.value}`,'gi')
            // console.log(e.target.value)
            // data.filter(item=>{ 
            //     if(item.Title.match(regx)){
            //         matches.push(item.Title)
            //     }
            // })
            
      await  fetch(`http://localhost:8000/Reports?title=${e.target.value}/`).then(res=>res.json()).then(data=>matches=data)
        // setting the cards according to the filter above. 
        for(let i of matches){
            //console.log(i)
        }
    }

    // this will load files from the backend for the main view.
    useEffect(()=>{
        fetch('http://localhost:8000/Reports/word_docs/').then(res=>res.json()).then(
            data=>{
                SetWordDocs(data)
            }
        )
        fetch('http://localhost:8000/Reports/excel_docs/').then(res=>res.json()).then(
            data=>{
                SetExcelDocs(data)
            }
        )
        fetch('http://localhost:8000/Reports/pdf_docs/').then(res=>res.json()).then(
            data=>{
                SetPdfDocs(data)
            }
        )
    },[])


    // this will handle the submit of the search input
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    // here the click on a specific resource is handled, the actual click happens in a child component (words). 
    const handleClick=async (filetype,pk)=>{
        // filetype and pk are coming from a child (fileCard) inside child components (words,excel,pdf)
        console.log(pk)
        // sending get request using the pk, in order to receive content which is sent to the word_file_page 
            await fetch(`http://localhost:8000/Reports/doc_content/${pk}/`).then(res=>res.json()).then(data=>{
            if(filetype=='word'){setWordContent(data)}    
            else if(filetype=='excel'){setExcelContent(data)}    
            else if(filetype=='pdf'){let pdf_path=data['path'];window.location.href = pdf_path;}    
            
                
            })
        
          
        // setting up the views (main view or one of the detail views)
        switch(filetype){
            case 'word':{setView('word')};break;  
            case 'excel':{setView('excel')};break;  
            //case 'pdf':{setView('pdf')};break;  
        }
    
    }


    switch(view){
        case 'word':{console.log('the view is set to word');return(<WordDoc title={word_content.title} content={word_content.content}/>)};break;
        case 'excel':{return(<ExcelDoc title={excel_content.title} content={excel_content.content}/>)};break; 
        case 'pdf':{return(<PdfDoc title={pdf_content.title} url={pdf_content.url}/>)};break;  
        default:{
            return (
                <>
                    <div className='files'>
                        <div className='files-container'>
                            <div className='files-side'></div>
                            <div className='files-main-area'>
                                <form onSubmit={handleSubmit}>
                                <input name='search' onChange={handleChange} placeholder='search..'/>
                                </form>
                                <Word cards={wordDocs} handleClick={handleClick}/>{/** here handle click is passed to the child component (word) */} 
                                <Excel cards={excelDocs} handleClick={handleClick}/>
                                <Pdf cards={pdfDocs} handleClick={handleClick}/>
                            </div>
                        </div>
                    </div>
                </>
            )
        
        }
}
    }
