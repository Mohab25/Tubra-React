import React from 'react'
import './styles/styles.css'
import FileCard from "../FileCard/fileCard.js";


export default function Pdf(props) {
    let {cards}=props
    return (
        <div className='Pdf'>
            <div>
                <h5> Documented Reports</h5>
                <div className='files-row'>{cards.map((item,index)=>{
                    let pdf_name = item.Name.substring(0,21)
                    return <FileCard key={index} title={pdf_name} fileType='pdf' handleClick={props.handleClick}/>
                })}
            </div>
        </div>
        </div>
    )
}
