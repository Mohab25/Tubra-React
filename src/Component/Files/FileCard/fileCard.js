import React from 'react'
import './styles/styles.css'
import Word_bg from './images/word.png'
import Excel_bg from './images/excel.png'
import Pdf_bg from './images/pdf.png'


export default function FileCard(props) {
    
    const background_selector=()=>{
        switch (props.fileType) {
            case 'word':
                return Word_bg
                break;
            case 'excel':
                return Excel_bg
                break;
            case 'pdf':
                return Pdf_bg
            default:
                break;
        }
    }
    
    return (
        <div className='file-card'>
            <div className='file-card-container'>
                <div className='file-card-img' onClick={()=>props.changeToDetailedView(props.fileType,props.pk)} style={{backgroundImage:`url(${background_selector()})`}}></div>
                <div className='file-card-body'>
                    <h6><b>{props.title}</b></h6>
                    <p>Ipsum ullamco do commodo culpa tempor id qui culpa.</p>
                </div>
            </div>
        </div>
    )
}
