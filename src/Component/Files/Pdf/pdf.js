import React from 'react'
import './styles/styles.css'
import FileCard from "../FileCard/fileCard.js";


export default function Pdf(props) {
    let {cards}=props
    return (
        <div className='Pdf'>
            <div>
                <h5> Documented Reports</h5>
                <div className='files-row'>{cards.map(item=>{
                    return <FileCard title={item} fileType='pdf' handleClick={props.handleClick}/>
                })}
            </div>
        </div>
        </div>
    )
}
