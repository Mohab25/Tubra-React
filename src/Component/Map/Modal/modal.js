import React,{useEffect,useState} from 'react'
import Word from '../../Files/Word/word'
import Excel from '../../Files/Excel/excel'
import PDF from '../../Files/Pdf/pdf'
import CAD from '../../CAD/cads'

import './styles.css'

export default function Modal(props) {
    let [wordDocs,SetWordDocs] = useState([]) // holding the word docs
    let [excelDocs,SetExcelDocs] = useState([])
    let [pdfDocs,SetPdfDocs] = useState([])

    useEffect(()=>{
       /* here you filtering the files based on the props based to the modal */ 
        // for testing i'm getting all the data.
        fetch('http://localhost:8000/Reports/word_docs/').then(res=>res.json()).then(
            data=>SetWordDocs(data.slice(0,8))
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
    // the files with cards grabbed from the state.
    const ModalWordDocs = <Word cards={wordDocs}/>
    const ModalExcelDocs = <Excel cards={excelDocs}/>
    const ModalPdfDocs = <PDF cards={pdfDocs}/>
    const CADModalFile = <CAD sidebarDisplay='none' formDisplay='none' CADContainerDisplay='block'/>
    const closeModal=(e)=>{
        if(e.target.classList.contains('backdrop')){props.modalCloser(null)}
    }

    return (
        <div className='backdrop' onClick={closeModal}>
            <div className='modal-inner-holer'>
                <h3 className='modal-entity-title'>{props.data.Category}{props.data.Pavement_Name}</h3>
                {CADModalFile}
                {ModalWordDocs}
                {ModalExcelDocs}
                {ModalPdfDocs}
            </div>
        </div>
    )
}
