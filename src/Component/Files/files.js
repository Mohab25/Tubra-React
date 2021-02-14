import React from 'react'
import './styles/styles.css'
import Word from './Word/word.js'
import WordDoc from './Word/word_file_page'
import Excel from './Excel/excel.js'
import ExcelDoc from './Excel/excel_page'
import Pdf from './Pdf/pdf.js'
import PdfDoc from './Pdf/pdf_page'
import data from './files.json'
import {useState} from 'react'


export default function Files() {
    let [view,setView] = useState('Main')
    let [cards,setCards]=useState(["Runway Report-1","Runway Report-2","Taxiway Report","Apron Report","Tarmac Report"])
    
    const handleChange=(e)=>{
        let matches = [] 
        // fetch. filter the response with regex, set state with the title of the filtered elem. 
            let regx = new RegExp(`${e.target.value}`,'gi')

            data.filter(item=>{ 
                if(item.Title.match(regx)){
                    matches.push(item.Title)
                }
            })            
        setCards(matches)
    }

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
                            <input name='search' onClick={handleChange} placeholder='search..'/>
                            </form>
                            <Word cards={cards} handleClick={handleClick}/>
                            <Excel cards={cards} handleClick={handleClick}/>
                            <Pdf cards={cards} handleClick={handleClick}/>
                        </div>
                    </div>
                    <p style={{marginTop:'250px',marginLeft:'250px'}}>Files</p>
                </div>
            </>
        )
    
    }
}
    }
