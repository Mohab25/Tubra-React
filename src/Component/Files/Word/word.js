import React from 'react'
import './styles/styles.css'
import FileCard from "../FileCard/fileCard.js";
import data from '../files.json'

export default function Word(props) {
    let {cards} = props; 
    
    return (
        <>
        <div className='Word'>
            <div>
                <h5> Documented Reports</h5>
                <div className='files-row'>{cards.map((item,index)=>{
                    return <FileCard key={index} handleClick={props.handleClick} title={item} fileType='word'/>
                })}
            </div>
        </div>
        </div>
    </>
    )
}
