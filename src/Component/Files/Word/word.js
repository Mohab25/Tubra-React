import React from 'react'
import './styles/styles.css'
import FileCard from "../FileCard/fileCard.js";

export default function Word(props) {
    let {cards} = props; 
    console.log(cards)
    return (
        <>
        <div className='Word'>
            <div>
                <h5> Documented Reports</h5>
                <div className='files-row'>{cards.map((item,index)=>{
                    let word_name = item.Name.substring(0,16)
                    let pk = item.pk
                    return <FileCard key={index} handleClick={props.handleClick} title={word_name} pk={pk} fileType='word'/>
                })}
            </div>
        </div>
        </div>
    </>
    )
}
