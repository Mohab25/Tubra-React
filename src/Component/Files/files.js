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
    let [view,setView] = useState('Main')
    // the cards here hold titles of the documents.
    let [wordDocs,SetWordDocs] = useState([])
    let [excelDocs,SetExcelDocs] = useState([])
    let [pdfDocs,SetPdfDocs] = useState([])
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
            console.log(i)
        }
    }

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


    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    const handleClick=(filetype)=>{
        console.log(filetype)
        switch(filetype){
            case 'word':{setView('word')};break;  
            case 'excel':{setView('excel')};break;  
            case 'pdf':{setView('pdf')};break;  
        }
    }


switch(view){
    case 'word':{return(<WordDoc/>)};break;
    case 'excel':{return(<ExcelDoc/>)};break; 
    case 'pdf':{return(<PdfDoc/>)};break;  
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
                            <Word cards={wordDocs} handleClick={handleClick}/>
                            <Excel cards={excelDocs} handleClick={handleClick}/>
                            <Pdf cards={pdfDocs} handleClick={handleClick}/>
                        </div>
                    </div>
                    <p style={{marginTop:'250px',marginLeft:'250px'}}>Files</p>
                </div>
            </>
        )
    
    }
}
    }
