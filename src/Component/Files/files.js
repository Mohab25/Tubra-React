import React,{useState,useEffect}  from 'react'
import './styles/styles.css'
import File from './FilesHolder/Files.js'
import WordDoc from './Word/word_file_page'
import ExcelDoc from './Excel/excel_page'
import PdfDoc from './Pdf/pdf_page'


export default function Files() {
    // setting up the view (Main view which holds all file types, and specific views for specific files(actual reading views))
    let [view,setView] = useState('Main')
    
    // holders for actual content coming from the backend.
    let [word_content,setWordContent] = useState({}) // this will be sent to the word_page component.
    let [excel_content,setExcelContent] = useState({})
    let [pdf_content,setPdfContent] = useState({})
    
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
            //console.log('the click handler is called!:',i)
        }
    }

    // this will handle the submit of the search input
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    // here the click on a specific resource is handled, the actual click happens in a child component (words). 
    const changeToDetailedView=async (filetype,pk)=>{
        // filetype and pk are coming from a child (fileCard) inside child components (words,excel,pdf)
        console.log('click handler is being called!:',pk)
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
                                <File fileType='word' changeToDetailedView={changeToDetailedView}/>{/** here handle click is passed to the child component (word) */} 
                                <File fileType='excel' changeToDetailedView={changeToDetailedView}/>
                                <File fileType='pdf' changeToDetailedView={changeToDetailedView}/>
                            </div>
                        </div>
                    </div>
                </>
            )
        
        }
}
    }
